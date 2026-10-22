import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { useApp } from '../context/AuthContext'

export default function Footer() {
  const { settings } = useApp()
  return (
    <footer className="bg-navy px-4 pb-6 pt-4">
      <div className="mx-auto max-w-7xl rounded-[36px] bg-gold p-8 text-navy md:p-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-3xl font-extrabold">{settings.brand}</h3>
            <p className="mt-2 max-w-xs text-sm font-medium">{settings.tagline}</p>
          </div>
          <div className="text-sm font-semibold">
            <p className="mb-2 text-xs uppercase tracking-wide opacity-70">Explore</p>
            <div className="flex flex-col gap-1"><Link to="/">Home</Link><Link to="/services">Services</Link><Link to="/about">About</Link><Link to="/bookings">My Bookings</Link></div>
          </div>
          <div className="text-sm font-semibold">
            <p className="mb-2 text-xs uppercase tracking-wide opacity-70">Contact</p>
            <a href={`mailto:${settings.email}`} className="flex items-center gap-2"><Mail size={14} />{settings.email}</a>
            <a href={`tel:${settings.phone}`} className="mt-2 flex items-center gap-2"><Phone size={14} />{settings.phone}</a>
          </div>
        </div>
        <p className="mt-8 border-t border-navy/20 pt-4 text-xs font-medium">© {new Date().getFullYear()} {settings.brand}. All rights reserved.</p>
      </div>
    </footer>
  )
}
