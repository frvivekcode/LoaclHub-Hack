import { Link } from 'react-router-dom'
import { useApp } from '../../context/AuthContext'
import { inr } from '../../utils/storage'
import { statusCls } from '../MyBookings'

export default function AdminDashboard() {
  const { bookings, users, services } = useApp()
  const by = (s) => bookings.filter((b) => b.status === s).length
  const revenue = bookings.filter((b) => b.status === 'Completed').reduce((s, b) => s + Number(b.price), 0)
  const cards = [
    ['Total Bookings', bookings.length], ['Pending', by('Pending')], ['Confirmed', by('Confirmed')], ['Completed', by('Completed')],
    ['Customers', users.filter((u) => u.role === 'customer').length], ['Active Services', services.filter((s) => s.active !== false).length], ['Revenue', inr(revenue)],
  ]
  const statuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled']
  const max = Math.max(1, ...statuses.map(by))
  const counts = {}; bookings.forEach((b) => { counts[b.serviceName] = (counts[b.serviceName] || 0) + 1 })
  const popular = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5)
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Dashboard <span className="hl">overview</span></h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map(([t, v], i) => <div key={t} className={`rounded-[28px] p-5 ${i === 6 ? 'bg-gold' : i === 0 ? 'bg-navy text-white' : 'bg-white'}`}><p className="text-xs font-semibold uppercase opacity-70">{t}</p><p className="mt-2 text-3xl font-extrabold">{v}</p></div>)}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] bg-white p-6"><h2 className="mb-4 text-lg font-bold">Booking status</h2>
          {statuses.map((s) => (<div key={s} className="mb-3"><div className="mb-1 flex justify-between text-sm"><span>{s}</span><b>{by(s)}</b></div><div className="h-3 rounded-full bg-mist"><div className="h-3 rounded-full bg-gold" style={{ width: `${(by(s) / max) * 100}%` }} /></div></div>))}</div>
        <div className="rounded-[28px] bg-white p-6"><h2 className="mb-4 text-lg font-bold">Popular services</h2>
          {popular.length === 0 ? <p className="text-sm text-navy/60">No bookings yet.</p> : popular.map(([n, c]) => <div key={n} className="flex justify-between border-b border-mist py-2 text-sm"><span>{n}</span><b>{c}</b></div>)}</div>
      </div>
      <div className="rounded-[28px] bg-white p-6">
        <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold">Recent bookings</h2><Link to="/admin/bookings" className="text-sm font-bold underline">View all</Link></div>
        {bookings.length === 0 ? <p className="text-sm text-navy/60">No bookings yet.</p> : bookings.slice(0, 5).map((b) => (
          <div key={b.id} className="flex items-center justify-between border-b border-mist py-3 text-sm"><div><b>{b.serviceName}</b><p className="text-xs text-navy/60">{b.customer} · {b.id}</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${statusCls[b.status]}`}>{b.status}</span></div>))}
      </div>
      <div className="flex flex-wrap gap-3"><Link to="/admin/services" className="btn-dark">Manage Services</Link><Link to="/admin/bookings" className="btn-gold">Manage Bookings</Link><Link to="/admin/users" className="btn-line">Manage Users</Link></div>
    </div>
  )
}
