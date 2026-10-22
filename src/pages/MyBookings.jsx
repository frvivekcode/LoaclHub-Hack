import { Link } from 'react-router-dom'
import { MapPin, Clock } from 'lucide-react'
import { useApp } from '../context/AuthContext'
import { inr } from '../utils/storage'
import { Img } from '../components/ServiceCard'

export const statusCls = { Pending: 'bg-gold/30 text-navy', Confirmed: 'bg-navy text-white', Completed: 'bg-green-100 text-green-800', Cancelled: 'bg-red-100 text-red-700' }

export default function MyBookings() {
  const { user, bookings, updateBooking, notify, settings } = useApp()
  const mine = bookings.filter((b) => b.userId === user.id)
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-extrabold md:text-5xl">My <span className="hl">bookings</span></h1>
      {mine.length === 0 ? (
        <div className="mt-8 rounded-[32px] bg-mist/60 p-12 text-center"><p className="text-xl font-bold">No bookings yet</p><Link to="/services" className="btn-gold mt-4">Browse services</Link></div>
      ) : (
        <div className="mt-8 space-y-4">
          {mine.map((b) => (
            <div key={b.id} className="flex flex-col gap-4 rounded-[28px] border border-mist p-4 sm:flex-row">
              <Img src={b.image} alt={b.serviceName} className="h-40 rounded-2xl sm:h-28 sm:w-40" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-bold">{b.serviceName}</h3><span className={`rounded-full px-3 py-1 text-xs font-bold ${statusCls[b.status]}`}>{b.status}</span></div>
                <p className="text-xs text-navy/60">ID: {b.id}</p>
                <p className="mt-1 flex items-center gap-1 text-sm"><Clock size={14} />{b.date} · {b.time}</p>
                <p className="flex items-center gap-1 text-sm"><MapPin size={14} />{b.address}</p>
              </div>
              <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-end">
                <p className="text-xl font-extrabold">{inr(b.price)}</p>
                {settings.allowCancel && ['Pending', 'Confirmed'].includes(b.status) && (
                  <button className="btn-line !py-2" onClick={() => { if (window.confirm('Cancel this booking?')) { updateBooking(b.id, { status: 'Cancelled' }); notify('Booking cancelled') } }}>Cancel</button>)}
              </div>
            </div>))}
        </div>
      )}
    </div>
  )
}
