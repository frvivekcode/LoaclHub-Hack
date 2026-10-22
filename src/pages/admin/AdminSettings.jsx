import { useState } from 'react'
import { useApp } from '../../context/AuthContext'
import { CITIES } from '../../data/services'

export default function AdminSettings() {
  const { settings, setSettings, setCity, notify } = useApp()
  const [f, setF] = useState(settings); const [errors, setErrors] = useState({})
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  const save = (e) => {
    e.preventDefault()
    const er = {}
    if (f.brand.trim().length < 2) er.brand = 'Brand name is required'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = 'Enter a valid email'
    if (!/^[0-9+\-\s]{8,15}$/.test(f.phone)) er.phone = 'Enter a valid phone number'
    setErrors(er); if (Object.keys(er).length) return
    setSettings(f); setCity(f.city); notify('Settings saved')
  }
  return (
    <form onSubmit={save} className="max-w-2xl space-y-4 rounded-[28px] bg-white p-6" noValidate>
      <h1 className="text-3xl font-extrabold">Admin <span className="hl">settings</span></h1>
      <div><label className="label">Brand name</label><input className="input" value={f.brand} onChange={set('brand')} />{errors.brand && <p className="err">{errors.brand}</p>}</div>
      <div><label className="label">Tagline</label><input className="input" value={f.tagline} onChange={set('tagline')} /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="label">Contact email</label><input className="input" value={f.email} onChange={set('email')} />{errors.email && <p className="err">{errors.email}</p>}</div>
        <div><label className="label">Contact phone</label><input className="input" value={f.phone} onChange={set('phone')} />{errors.phone && <p className="err">{errors.phone}</p>}</div>
        <div><label className="label">Default city</label><select className="input" value={f.city} onChange={set('city')}>{CITIES.map((c) => <option key={c}>{c}</option>)}</select></div>
        <div><label className="label">Currency</label><input className="input bg-mist/50" value="INR (₹)" readOnly /></div>
      </div>
      <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={f.autoConfirm} onChange={set('autoConfirm')} />Auto-confirm new bookings</label>
      <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={f.allowCancel} onChange={set('allowCancel')} />Allow customers to cancel bookings</label>
      <button className="btn-gold">Save settings</button>
    </form>
  )
}
