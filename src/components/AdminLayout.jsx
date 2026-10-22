import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import AdminSidebar from './AdminSidebar'
import { useApp } from '../context/AuthContext'

export default function AdminLayout() {
  const { user } = useApp()
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-mist/50">
      <div className="fixed inset-y-0 left-0 hidden w-64 lg:block"><AdminSidebar /></div>
      {open && <div className="fixed inset-0 z-40 flex lg:hidden"><div className="w-64"><AdminSidebar onNavigate={() => setOpen(false)} /></div><div className="flex-1 bg-black/50" onClick={() => setOpen(false)} /></div>}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-30 flex items-center justify-between bg-white px-4 py-3 shadow-sm">
          <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
          <p className="font-bold">Admin Panel</p>
          <span className="rounded-full bg-gold px-4 py-1.5 text-sm font-bold">{user?.name}</span>
        </div>
        <main className="p-4 md:p-8"><Outlet /></main>
      </div>
    </div>
  )
}
