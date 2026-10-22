import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, Search, Quote } from 'lucide-react'
import { useApp } from '../context/AuthContext'
import { CATEGORIES } from '../data/services'
import ServiceCard, { Img } from '../components/ServiceCard'
import BookingModal from '../components/BookingModal'

export default function Home() {
  const { activeServices, users, bookings, city } = useApp()
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const [book, setBook] = useState(null)
  const im = (i) => activeServices[i % Math.max(activeServices.length, 1)]
  const tile = (i, cls) => im(i) && <Img src={im(i).image} alt={im(i).name} className={`rounded-[28px] ${cls}`} />
  const popular = [...activeServices].sort((a, b) => b.rating - a.rating).slice(0, 4)
  const avg = activeServices.length ? (activeServices.reduce((s, x) => s + x.rating, 0) / activeServices.length).toFixed(1) : '0'
  const stats = [[activeServices.length + '+', 'Services'], [users.filter((u) => u.role === 'customer').length + '+', 'Customers'], [bookings.length + '+', 'Bookings'], [avg + '★', 'Avg. Rating']]
  const marquee = ['Cleaning', 'Plumbing', 'Electrical', 'Salon', 'Painting', 'Appliance Repair']

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-6 text-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">Elevate Your Home With <span className="hl">Trusted</span> Local Experts</h1>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          <div className="grid gap-3 md:gap-4">{tile(0, 'h-48 md:h-64')}{tile(5, 'h-28 md:h-36')}</div>
          <div className="hidden gap-3 md:grid md:pt-8">{tile(1, 'h-[26rem]')}</div>
          <div className="col-span-2 flex flex-col items-center gap-4 md:col-span-1 md:pt-12">{tile(3, 'h-48 w-full md:h-56')}
            <Link to="/services" className="btn-dark w-full">Explore Services <ArrowUpRight size={14} className="text-gold" /></Link></div>
          <div className="hidden md:grid md:pt-6">{tile(2, 'h-[26rem]')}</div>
          <div className="grid gap-3 md:gap-4">{tile(4, 'h-48 md:h-64')}{tile(6, 'h-28 md:h-36')}</div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); nav(`/services?q=${encodeURIComponent(q)}&cat=${encodeURIComponent(cat)}`) }}
          className="mx-auto mt-8 flex max-w-3xl flex-col gap-2 rounded-[32px] border border-mist p-2 shadow-lg sm:flex-row sm:rounded-full">
          <input aria-label="Search service" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`What do you need in ${city}?`} className="flex-1 rounded-full px-5 py-3 text-sm outline-none" />
          <select aria-label="Category" value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-full bg-mist/60 px-4 py-3 text-sm outline-none"><option value="">All categories</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
          <button className="btn-gold"><Search size={16} />Search</button>
        </form>
        <div className="mt-12 grid items-end gap-6 text-left md:grid-cols-2">
          <div><Quote className="text-mist" fill="currentColor" size={36} /><p className="mt-2 max-w-md text-sm">LocalHub professionals arrived on time and the work was spotless. Booking took under two minutes!</p><p className="mt-3 font-semibold italic"><span className="bg-gold/40 px-1">Rafi H.</span></p></div>
          <Link to="/services" className="md:text-right"><p className="flex items-center gap-3 md:justify-end"><span className="text-5xl font-light">01</span><span className="text-xs">Home Care</span><ArrowRight className="md:ml-auto" /></p>
            <p className="mt-1 text-xl font-bold">Set Up Your Home With The Best Local Pros</p></Link>
        </div>
      </section>

      {/* Dark section */}
      <section className="mt-16 bg-navy px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 rounded-[32px] border border-white/20 bg-white/5 p-6 text-center md:grid-cols-4">
            {stats.map(([n, l]) => <div key={l}><p className="text-3xl font-extrabold md:text-4xl">{n.replace(/(\d+\.?\d*)/, '$1')}</p><p className="text-sm text-white/70">{l}</p></div>)}
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="text-4xl font-extrabold">Our <span className="hl">Services</span></h2>
              <p className="mt-2 text-sm text-white/70">Everything your home needs, from verified professionals.</p>
              <div className="mt-6 space-y-3">
                {CATEGORIES.map((c, i) => (
                  <Link key={c} to={`/services?cat=${encodeURIComponent(c)}`} className="flex items-center justify-between rounded-full border border-white/30 px-6 py-4 transition hover:border-gold hover:bg-white/5">
                    <span className="font-semibold"><span className="mr-3 text-gold">0{i + 1}</span>{c}</span><ArrowRight size={16} />
                  </Link>))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
              {im(3) && <Img src={im(3).image} alt={im(3).name} className="min-h-[18rem] rounded-[28px]" />}
              <div className="flex flex-col gap-4">
                <Link to="/about" className="flex-1 rounded-[28px] bg-white/10 p-5 text-sm">Wondering how it works?<span className="mt-6 flex items-center justify-between font-semibold">See how we work <ArrowUpRight size={16} /></span></Link>
                <Link to="/services" className="flex-1 rounded-[28px] bg-gold p-5 text-sm font-semibold text-navy">Need an expert for your task?<span className="mt-6 flex items-center justify-between text-lg font-extrabold">Meet our experts <ArrowUpRight size={20} /></span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden bg-navy pb-10 text-white">
        <div className="flex w-max animate-marquee gap-8 text-4xl font-extrabold md:text-6xl">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => <span key={i} className="flex items-center gap-8">{m}<span className="text-gold">✦</span></span>)}
        </div>
      </div>

      {/* Popular */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between"><h2 className="text-4xl font-extrabold">Popular <span className="hl">services</span></h2><Link to="/services" className="btn-line hidden sm:inline-flex">View all</Link></div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{popular.map((s) => <ServiceCard key={s.id} service={s} onBook={setBook} />)}</div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="flex flex-col items-center justify-between gap-6 rounded-[40px] bg-navy p-10 text-white md:flex-row">
          <h2 className="max-w-xl text-3xl font-extrabold md:text-4xl">Ready to book your next <span className="hl">service</span>?</h2>
          <Link to="/services" className="btn-gold">Book Now <ArrowUpRight size={16} /></Link>
        </div>
      </section>
      {book && <BookingModal service={book} onClose={() => setBook(null)} />}
    </div>
  )
}
