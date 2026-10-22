import { createContext, useContext, useState, useCallback } from 'react'
import { KEYS, read, write, seed, uid } from '../utils/storage'
import { defaultServices, defaultUsers, defaultSettings } from '../data/services'

seed({
  [KEYS.users]: defaultUsers, [KEYS.services]: defaultServices, [KEYS.bookings]: [],
  [KEYS.saved]: {}, [KEYS.city]: 'Jaipur', [KEYS.settings]: defaultSettings,
})

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

export function AppProvider({ children }) {
  const [users, setUsersS] = useState(() => read(KEYS.users, defaultUsers))
  const [services, setServicesS] = useState(() => read(KEYS.services, defaultServices))
  const [bookings, setBookingsS] = useState(() => read(KEYS.bookings, []))
  const [saved, setSavedS] = useState(() => read(KEYS.saved, {}))
  const [city, setCityS] = useState(() => read(KEYS.city, 'Jaipur'))
  const [settings, setSettingsS] = useState(() => ({ ...defaultSettings, ...read(KEYS.settings, {}) }))
  const [sessionId, setSessionId] = useState(() => read(KEYS.session, null))
  const [toast, setToast] = useState('')

  const notify = useCallback((m) => { setToast(m); setTimeout(() => setToast(''), 2800) }, [])
  const mk = (key, set) => (v) => { set(v); write(key, v) }
  const setUsers = mk(KEYS.users, setUsersS), setServices = mk(KEYS.services, setServicesS)
  const setBookings = mk(KEYS.bookings, setBookingsS), setSaved = mk(KEYS.saved, setSavedS)
  const setCity = mk(KEYS.city, setCityS), setSettings = mk(KEYS.settings, setSettingsS)

  const user = users.find((u) => u.id === sessionId) || null
  const safeUser = user ? { id: user.id, name: user.name, email: user.email, role: user.role } : null

  const login = (email, password) => {
    const u = users.find((x) => x.email.toLowerCase() === email.trim().toLowerCase() && x.password === password)
    if (!u) return null
    setSessionId(u.id); write(KEYS.session, u.id); return u
  }
  const register = (name, email, password) => {
    if (users.some((x) => x.email.toLowerCase() === email.trim().toLowerCase())) return { error: 'Email already registered' }
    const u = { id: uid('u_'), name: name.trim(), email: email.trim(), password, role: 'customer', createdAt: new Date().toISOString() }
    setUsers([...users, u]); setSessionId(u.id); write(KEYS.session, u.id); return { user: u }
  }
  const logout = () => { setSessionId(null); write(KEYS.session, null) }

  const mySaved = user ? saved[user.id] || [] : []
  const toggleSaved = (sid) => {
    if (!user) return
    const cur = saved[user.id] || []
    const next = cur.includes(sid) ? cur.filter((i) => i !== sid) : [...cur, sid]
    setSaved({ ...saved, [user.id]: next })
    notify(cur.includes(sid) ? 'Removed from saved services' : 'Saved to favourites')
  }

  const addBooking = (service, data) => {
    const b = {
      id: 'LH' + Date.now().toString().slice(-7), userId: user.id, customer: user.name, email: user.email,
      serviceId: service.id, serviceName: service.name, image: service.image, price: service.price,
      ...data, status: settings.autoConfirm ? 'Confirmed' : 'Pending', createdAt: new Date().toISOString(),
    }
    setBookings([b, ...bookings]); return b
  }
  const updateBooking = (id, patch) => setBookings(bookings.map((b) => (b.id === id ? { ...b, ...patch } : b)))
  const deleteBooking = (id) => setBookings(bookings.filter((b) => b.id !== id))

  const upsertService = (s) => {
    if (s.id) setServices(services.map((x) => (x.id === s.id ? s : x)))
    else setServices([{ ...s, id: uid('s_') }, ...services])
  }
  const deleteService = (id) => setServices(services.filter((s) => s.id !== id))
  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id))
    setBookings(bookings.filter((b) => b.userId !== id))
    const { [id]: _drop, ...rest } = saved; setSaved(rest)
  }

  const activeServices = services.filter((s) => s.active !== false)
  return (
    <Ctx.Provider value={{
      user: safeUser, users, services, activeServices, bookings, saved, mySaved, city, settings, toast,
      login, register, logout, toggleSaved, addBooking, updateBooking, deleteBooking, upsertService,
      deleteService, deleteUser, setCity, setSettings, notify,
    }}>
      {children}
    </Ctx.Provider>
  )
}
