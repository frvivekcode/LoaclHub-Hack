import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useApp } from '../context/AuthContext'
import { inr } from '../utils/storage'
import { Img } from '../components/ServiceCard'
import BookingModal from '../components/BookingModal'

export default function SavedServices() {
  const { activeServices, mySaved, toggleSaved } = useApp()
  const [book, setBook] = useState(null)
  const list = activeServices.filter((s) => mySaved.includes(s.id))
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-extrabold md:text-5xl">Saved <span className="hl">services</span></h1>
      {list.length === 0 ? (
        <div className="mt-8 rounded-[32px] bg-mist/60 p-12 text-center"><p className="text-xl font-bold">Nothing saved yet</p><Link to="/services" className="btn-gold mt-4">Explore services</Link></div>
      ) : (
        <div className="mt-8 space-y-4">
          {list.map((s) => (
            <div key={s.id} className="flex flex-col gap-4 rounded-[28px] border border-mist p-4 sm:flex-row sm:items-center">
              <Img src={s.image} alt={s.name} className="h-40 rounded-2xl sm:h-24 sm:w-36" />
              <div className="flex-1"><h3 className="text-lg font-bold">{s.name}</h3><p className="font-extrabold">{inr(s.price)}</p></div>
              <div className="flex gap-2"><button className="btn-line !px-4 !py-2" onClick={() => toggleSaved(s.id)}><Trash2 size={14} />Remove</button><button className="btn-dark !py-2" onClick={() => setBook(s)}>Book Now</button></div>
            </div>))}
        </div>
      )}
      {book && <BookingModal service={book} onClose={() => setBook(null)} />}
    </div>
  )
}
