import { useState } from 'react'
import { Pencil, Trash2, Plus, X } from 'lucide-react'
import { useApp } from '../../context/AuthContext'
import { CATEGORIES } from '../../data/services'
import { inr } from '../../utils/storage'
import { Img } from '../../components/ServiceCard'

const empty = { name: '', category: CATEGORIES[0], description: '', price: '', rating: 4.5, experts: 10, image: '', active: true }

export default function ManageServices() {
  const { services, upsertService, deleteService, notify } = useApp()
  const [q, setQ] = useState(''); const [cat, setCat] = useState('')
  const [form, setForm] = useState(null); const [errors, setErrors] = useState({})
  const list = services.filter((s) => (!cat || s.category === cat) && s.name.toLowerCase().includes(q.toLowerCase()))
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const save = () => {
    const e = {}
    if (form.name.trim().length < 3) e.name = 'Name must be at least 3 characters'
    if (form.description.trim().length < 10) e.description = 'Description must be at least 10 characters'
    if (!(Number(form.price) > 0)) e.price = 'Enter a price above 0'
    if (!(Number(form.rating) >= 0 && Number(form.rating) <= 5)) e.rating = 'Rating must be 0–5'
    if (!(Number(form.experts) >= 0)) e.experts = 'Invalid number'
    if (!/^https?:\/\//.test(form.image)) e.image = 'Enter a valid image URL (http/https)'
    setErrors(e); if (Object.keys(e).length) return
    upsertService({ ...form, name: form.name.trim(), description: form.description.trim(), price: Number(form.price), rating: Number(form.rating), experts: Number(form.experts) })
    notify(form.id ? 'Service updated' : 'Service added'); setForm(null)
  }
  const F = ({ k, label, type = 'text' }) => (<div><label className="label">{label}</label><input type={type} step="any" className="input" value={form[k]} onChange={set(k)} />{errors[k] && <p className="err">{errors[k]}</p>}</div>)

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-extrabold">Manage <span className="hl">services</span></h1>
        <button className="btn-dark" onClick={() => { setForm(empty); setErrors({}) }}><Plus size={16} />Add Service</button></div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row"><input aria-label="Search" placeholder="Search services" className="input" value={q} onChange={(e) => setQ(e.target.value)} />
        <select aria-label="Category" className="input sm:w-56" value={cat} onChange={(e) => setCat(e.target.value)}><option value="">All categories</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
      <div className="mt-4 overflow-x-auto rounded-[28px] bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs uppercase text-navy/60"><tr><th className="p-4">Service</th><th>Category</th><th>Price</th><th>Rating</th><th>Experts</th><th>Status</th><th className="pr-4 text-right">Actions</th></tr></thead>
          <tbody>{list.map((s) => (
            <tr key={s.id} className="border-t border-mist"><td className="flex items-center gap-3 p-4"><Img src={s.image} alt={s.name} className="h-10 w-14 rounded-lg" /><b>{s.name}</b></td><td>{s.category}</td><td>{inr(s.price)}</td><td>{s.rating}</td><td>{s.experts}</td>
              <td><span className={`rounded-full px-2 py-1 text-xs font-bold ${s.active !== false ? 'bg-gold/30' : 'bg-mist'}`}>{s.active !== false ? 'Active' : 'Hidden'}</span></td>
              <td className="pr-4 text-right"><button aria-label="Edit" className="p-2" onClick={() => { setForm(s); setErrors({}) }}><Pencil size={16} /></button>
                <button aria-label="Delete" className="p-2 text-red-600" onClick={() => { if (window.confirm(`Delete "${s.name}"?`)) { deleteService(s.id); notify('Service deleted') } }}><Trash2 size={16} /></button></td></tr>))}
            {list.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-navy/60">No services found.</td></tr>}</tbody>
        </table>
      </div>
      {form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"><div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[32px] bg-white p-6">
          <div className="mb-4 flex justify-between"><h2 className="text-2xl font-extrabold">{form.id ? 'Edit' : 'Add'} service</h2><button aria-label="Close" onClick={() => setForm(null)}><X /></button></div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2"><F k="name" label="Name" /></div>
            <div><label className="label">Category</label><select className="input" value={form.category} onChange={set('category')}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
            <F k="price" label="Price (₹)" type="number" /><F k="rating" label="Rating (0–5)" type="number" /><F k="experts" label="Experts" type="number" />
            <div className="sm:col-span-2"><label className="label">Description</label><textarea rows={3} className="input" value={form.description} onChange={set('description')} />{errors.description && <p className="err">{errors.description}</p>}</div>
            <div className="sm:col-span-2"><F k="image" label="Image URL" /></div>
            <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={form.active !== false} onChange={set('active')} />Active (visible to customers)</label>
          </div>
          <div className="mt-5 flex gap-3"><button className="btn-line flex-1" onClick={() => setForm(null)}>Cancel</button><button className="btn-gold flex-1" onClick={save}>Save</button></div>
        </div></div>)}
    </div>
  )
}
