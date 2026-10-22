import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Heart, CalendarCheck, Menu, X, MapPin, LogOut, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AuthContext'
import { CITIES } from '../data/services'

export default function Header() {
  const { user, logout, city, setCity, settings, mySaved } = useApp()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const link = ({ isActive }) => `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-gold text-navy' : 'text-white/80 hover:text-white'}`
  const search = (e) => { e.preventDefault(); nav('/services?q=' + encodeURIComponent(q)); setOpen(false) }
  const out = () => { logout(); nav('/login') }

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-gold">L</span>{settings.brand}
        </Link>
        <nav className="hidden items-center gap-1 rounded-full bg-navy p-1.5 lg:flex">
          <NavLink to="/" end className={link}>Home</NavLink>
          <NavLink to="/services" className={link}>Services</NavLink>
          <NavLink to="/about" className={link}>About</NavLink>
          {user?.role === 'admin' && <NavLink to="/admin" className={link}>Admin</NavLink>}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <label className="flex items-center gap-1 rounded-full border border-mist px-3 py-2 text-sm">
            <MapPin size={14} className="text-gold" />
            <select aria-label="City" value={city} onChange={(e) => setCity(e.target.value)} className="bg-transparent outline-none">
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <form onSubmit={search} className="flex items-center rounded-full border border-mist px-3 py-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services" className="w-32 bg-transparent text-sm outline-none" />
            <button aria-label="Search"><Search size={16} /></button>
          </form>
          {user ? (
            <>
              <Link to="/saved" aria-label="Saved services" className="relative grid h-10 w-10 place-items-center rounded-full border border-mist">
                <Heart size={16} />{mySaved.length > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-gold px-1.5 text-[10px] font-bold">{mySaved.length}</span>}
              </Link>
              <Link to="/bookings" aria-label="My bookings" className="grid h-10 w-10 place-items-center rounded-full border border-mist"><CalendarCheck size={16} /></Link>
              <span className="max-w-[90px] truncate text-sm font-semibold">{user.name.split(' ')[0]}</span>
              <button onClick={out} className="btn-line !py-2"><LogOut size={14} />Logout</button>
            </>
          ) : (
            <><Link to="/login" className="btn-line !py-2">Login</Link><Link to="/register" className="btn-gold !py-2">Register</Link></>
          )}
        </div>
        <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="space-y-3 border-t border-mist bg-white px-4 pb-5 pt-3 lg:hidden">
          <form onSubmit={search} className="flex items-center rounded-full border border-mist px-4 py-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services" className="flex-1 bg-transparent text-sm outline-none" />
            <button aria-label="Search"><Search size={16} /></button>
          </form>
          <select aria-label="City" value={city} onChange={(e) => setCity(e.target.value)} className="input">{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
          {[['/', 'Home'], ['/services', 'Services'], ['/about', 'About'], ...(user ? [['/saved', 'Saved Services'], ['/bookings', 'My Bookings']] : [['/login', 'Login'], ['/register', 'Register']]),
            ...(user?.role === 'admin' ? [['/admin', 'Admin Dashboard']] : [])].map(([to, t]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} className="block rounded-2xl bg-mist/60 px-4 py-3 text-sm font-semibold">{t}</Link>
          ))}
          {user && <button onClick={out} className="btn-dark w-full"><LogOut size={14} />Logout</button>}
        </div>
      )}
    </header>
  )
}
