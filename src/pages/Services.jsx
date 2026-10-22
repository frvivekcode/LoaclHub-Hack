import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useApp } from '../context/AuthContext'
import { CATEGORIES } from '../data/services'
import ServiceCard from '../components/ServiceCard'
import BookingModal from '../components/BookingModal'

export default function Services() {
  const { activeServices } = useApp()
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const cat = params.get('cat') || ''
  const [book, setBook] = useState(null)
  const upd = (k, v) => { const p = new URLSearchParams(params); v ? p.set(k, v) : p.delete(k); setParams(p, { replace: true }) }
  const list = activeServices.filter((s) => (!cat || s.category === cat) && (s.name + s.description + s.category).toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-extrabold md:text-6xl">Find your <span className="hl">service</span></h1>
      <div className="mt-6 flex items-center rounded-full border border-mist px-5 py-3 shadow-sm">
        <Search size={18} className="text-gold" />
        <input aria-label="Search services" value={q} onChange={(e) => upd('q', e.target.value)} placeholder="Search services" className="ml-3 flex-1 text-sm outline-none" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {['', ...CATEGORIES].map((c) => (
          <button key={c} onClick={() => upd('cat', c)} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${cat === c ? 'bg-navy text-white' : 'bg-mist/70 hover:bg-gold'}`}>{c || 'All'}</button>))}
      </div>
      {list.length === 0 ? (
        <div className="mt-12 rounded-[32px] bg-mist/60 p-12 text-center"><p className="text-xl font-bold">No services found</p><p className="text-sm text-navy/70">Try a different search or category.</p></div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{list.map((s) => <ServiceCard key={s.id} service={s} onBook={setBook} />)}</div>
      )}
      {book && <BookingModal service={book} onClose={() => setBook(null)} />}
    </div>
  )
}
