import { Heart, Star, Users } from 'lucide-react'
import { useApp } from '../context/AuthContext'
import { inr } from '../utils/storage'

export function Img({ src, alt, className = '' }) {
  return (
    <div className={`overflow-hidden bg-gradient-to-br from-navy to-gold/60 ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover"
        onError={(e) => { e.currentTarget.style.display = 'none' }} />
    </div>
  )
}

export default function ServiceCard({ service, onBook }) {
  const { mySaved, toggleSaved } = useApp()
  const on = mySaved.includes(service.id)
  return (
    <div className="group flex flex-col overflow-hidden rounded-[28px] border border-mist bg-white transition hover:shadow-xl">
      <div className="relative">
        <Img src={service.image} alt={service.name} className="aspect-[4/3] w-full rounded-[28px]" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold">{service.category}</span>
        <button aria-label="Save service" onClick={() => toggleSaved(service.id)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white shadow">
          <Heart size={16} className={on ? 'fill-gold text-gold' : 'text-navy'} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold">{service.name}</h3>
        <p className="mt-1 flex-1 text-sm text-navy/70">{service.description}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-navy/70">
          <span className="flex items-center gap-1"><Star size={14} className="fill-gold text-gold" />{service.rating}</span>
          <span className="flex items-center gap-1"><Users size={14} />{service.experts} experts</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-extrabold">{inr(service.price)}</span>
          <button className="btn-dark !px-5 !py-2" onClick={() => onBook(service)}>Book Now</button>
        </div>
      </div>
    </div>
  )
}
