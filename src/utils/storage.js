export const KEYS = {
  users: 'lh_users', session: 'lh_session', services: 'lh_services', bookings: 'lh_bookings',
  saved: 'lh_saved', city: 'lh_city', settings: 'lh_settings',
}
export const read = (k, fallback) => {
  try { const v = localStorage.getItem(k); return v === null ? fallback : JSON.parse(v) } catch { return fallback }
}
export const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } }
export const uid = (p = 'id') => p + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase()
export const seed = (defaults) => {
  Object.entries(defaults).forEach(([k, v]) => { try { if (localStorage.getItem(k) === null) write(k, v) } catch { /* ignore */ } })
}
export const inr = (n) => '₹' + Number(n || 0).toLocaleString('en-IN')
