import { NavLink, Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Wrench, CalendarCheck, Users, Settings, Globe, LogOut } from 'lucide-react'
import { useApp } from '../context/AuthContext'

const items = [
  ['/admin', 'Dashboard', LayoutDashboard, true], ['/admin/services', 'Manage Services', Wrench],
  ['/admin/bookings', 'Manage Bookings', CalendarCheck], ['/admin/users', 'Manage Users', Users],
  ['/admin/settings', 'Settings', Settings],
]

export default function AdminSidebar({ onNavigate }) {
  const { logout, settings } = useApp()
  const nav = useNavigate()
  const cls = ({ isActive }) => `flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-gold text-navy' : 'text-white/80 hover:bg-white/10'}`
  return (
    <aside className="flex h-full flex-col bg-navy p-5 text-white">
      <Link to="/admin" className="mb-8 flex items-center gap-2 text-xl font-extrabold">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-navy">L</span>{settings.brand}
      </Link>
      <nav className="flex flex-1 flex-col gap-1" onClick={onNavigate}>
        {items.map(([to, t, Icon, end]) => <NavLink key={to} to={to} end={end} className={cls}><Icon size={16} />{t}</NavLink>)}
      </nav>
      <Link to="/" className="mb-1 flex items-center gap-3 rounded-full border border-white/30 px-4 py-3 text-sm font-semibold"><Globe size={16} />View Customer Website</Link>
      <button onClick={() => { logout(); nav('/login') }} className="flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/10"><LogOut size={16} />Logout</button>
    </aside>
  )
}
