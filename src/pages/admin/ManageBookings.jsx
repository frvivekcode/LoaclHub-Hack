import { useState } from 'react'
import { Trash2, Eye, X } from 'lucide-react'
import { useApp } from '../../context/AuthContext'
import { inr } from '../../utils/storage'
import { statusCls } from '../MyBookings'

const STATUSES = ['Pending', 'Confirmed', 'Completed', 'Cancelled']

export default function ManageBookings() {
  const { bookings, updateBooking, deleteBooking, notify } = useApp()
  const [q, setQ] = useState(''); const [st, setSt] = useState(''); const [view, setView] = useState(null)
  const list = bookings.filter((b) => (!st || b.status === st) && (b.id + b.customer + b.serviceName).toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <h1 className="text-3xl font-extrabold">Manage <span className="hl">bookings</span></h1>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row"><input aria-label="Search" placeholder="Search by ID, customer or service" className="input" value={q} onChange={(e) => setQ(e.target.value)} />
        <select aria-label="Status" className="input sm:w-56" value={st} onChange={(e) => setSt(e.target.value)}><option value="">All statuses</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></div>
      <div className="mt-4 overflow-x-auto rounded-[28px] bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs uppercase text-navy/60"><tr><th className="p-4">ID</th><th>Customer</th><th>Service</th><th>Date</th><th>Price</th><th>Status</th><th className="pr-4 text-right">Actions</th></tr></thead>
          <tbody>{list.map((b) => (
            <tr key={b.id} className="border-t border-mist"><td className="p-4 font-bold">{b.id}</td><td>{b.customer}</td><td>{b.serviceName}</td><td>{b.date}</td><td>{inr(b.price)}</td>
              <td><select aria-label="Change status" className={`rounded-full px-2 py-1 text-xs font-bold ${statusCls[b.status]}`} value={b.status} onChange={(e) => { updateBooking(b.id, { status: e.target.value }); notify('Status updated') }}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></td>
              <td className="pr-4 text-right"><button aria-label="View" className="p-2" onClick={() => setView(b)}><Eye size={16} /></button>
                <button aria-label="Delete" className="p-2 text-red-600" onClick={() => { if (window.confirm('Delete booking ' + b.id + '?')) { deleteBooking(b.id); notify('Booking deleted') } }}><Trash2 size={16} /></button></td></tr>))}
            {list.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-navy/60">No bookings found.</td></tr>}</tbody>
        </table>
      </div>
      {view && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"><div className="w-full max-w-md rounded-[32px] bg-white p-6">
          <div className="mb-3 flex justify-between"><h2 className="text-2xl font-extrabold">Booking {view.id}</h2><button aria-label="Close" onClick={() => setView(null)}><X /></button></div>
          <dl className="space-y-2 text-sm">{[['Customer', view.customer + ' (' + view.email + ')'], ['Service', view.serviceName], ['Date & time', view.date + ' · ' + view.time], ['Address', view.address + (view.city ? ', ' + view.city : '')], ['Notes', view.notes || '—'], ['Price', inr(view.price)], ['Status', view.status], ['Created', new Date(view.createdAt).toLocaleString('en-IN')]].map(([k, v]) => <div key={k} className="flex gap-3"><dt className="w-24 font-semibold text-navy/60">{k}</dt><dd className="flex-1">{v}</dd></div>)}</dl>
        </div></div>)}
    </div>
  )
}
