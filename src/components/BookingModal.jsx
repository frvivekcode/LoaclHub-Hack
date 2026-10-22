import { useState } from 'react'
import { X, CheckCircle2 } from 'lucide-react'
import { useApp } from '../context/AuthContext'
import { inr } from '../utils/storage'
import { Img } from './ServiceCard'

const TIMES = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM']

export default function BookingModal({ service, onClose }) {
  const { addBooking, notify, city } = useApp()
  const [f, setF] = useState({ date: '', time: '', address: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(null)
  const today = new Date().toISOString().slice(0, 10)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = () => {
    const e = {}
    if (!f.date || f.date < today) e.date = 'Choose a valid future date'
    if (!f.time) e.time = 'Select a time slot'
    if (f.address.trim().length < 8) e.address = 'Enter a complete address (min 8 characters)'
    setErrors(e)
    if (Object.keys(e).length) return
    const b = addBooking(service, { ...f, address: f.address.trim(), city })
    setDone(b); notify('Booking placed: ' + b.id)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true">
      <div className="max-h-[95vh] w-full max-w-lg overflow-y-auto rounded-t-[32px] bg-white p-6 sm:rounded-[32px]">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-2xl font-extrabold">Book <span className="hl">service</span></h2>
          <button aria-label="Close" onClick={onClose} className="rounded-full bg-mist p-2"><X size={16} /></button>
        </div>
        {done ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto text-gold" size={56} />
            <h3 className="mt-3 text-xl font-bold">Booking Confirmed Request Sent</h3>
            <p className="mt-1 text-sm text-navy/70">Booking ID <b>{done.id}</b> · Status: {done.status}</p>
            <button className="btn-dark mt-6" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex gap-3 rounded-2xl bg-mist/60 p-3">
              <Img src={service.image} alt={service.name} className="h-16 w-20 rounded-xl" />
              <div><p className="font-bold">{service.name}</p><p className="text-sm text-navy/70">{service.category}</p>
                <p className="font-extrabold">{inr(service.price)}</p></div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><label className="label" htmlFor="d">Date</label>
                <input id="d" type="date" min={today} className="input" value={f.date} onChange={set('date')} />
                {errors.date && <p className="err">{errors.date}</p>}</div>
              <div><label className="label" htmlFor="t">Time</label>
                <select id="t" className="input" value={f.time} onChange={set('time')}>
                  <option value="">Select</option>{TIMES.map((t) => <option key={t}>{t}</option>)}
                </select>
                {errors.time && <p className="err">{errors.time}</p>}</div>
            </div>
            <div className="mt-3"><label className="label" htmlFor="a">Address ({city})</label>
              <textarea id="a" rows={2} className="input" value={f.address} onChange={set('address')} />
              {errors.address && <p className="err">{errors.address}</p>}</div>
            <div className="mt-3"><label className="label" htmlFor="n">Notes (optional)</label>
              <textarea id="n" rows={2} className="input" value={f.notes} onChange={set('notes')} /></div>
            <div className="mt-5 flex gap-3">
              <button className="btn-line flex-1" onClick={onClose}>Cancel</button>
              <button className="btn-gold flex-1" onClick={submit}>Confirm Booking</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
