import { Mail, Phone, ShieldCheck, Leaf, Target, Eye } from 'lucide-react'
import { useApp } from '../context/AuthContext'
import { Img } from '../components/ServiceCard'

const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`

export default function About() {
  const { settings, users, bookings, activeServices } = useApp()
  const stats = [[activeServices.length + '+', 'Services'], [users.length + '+', 'Members'], [bookings.length + '+', 'Bookings'], ['4.7★', 'Average rating']]
  const steps = [['01', 'Search', 'Find the service you need in your city.'], ['02', 'Book', 'Pick a date, time and address.'], ['03', 'Relax', 'A verified expert arrives and gets it done.']]
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className="grid items-center gap-8 rounded-[40px] bg-navy p-8 text-white md:grid-cols-2 md:p-14">
          <div><h1 className="text-4xl font-extrabold leading-tight md:text-6xl">About <span className="hl">{settings.brand}</span></h1>
            <p className="mt-4 text-white/80">{settings.tagline}. We connect neighbours with skilled, background-verified professionals.</p></div>
          <Img src={photo('photo-1521791136064-7986c2920216')} alt="Team shaking hands" className="h-64 rounded-[32px] md:h-80" />
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 md:grid-cols-2">
        {[[Target, 'Our Mission', 'Make quality home services simple, affordable and dependable for every household.'], [Eye, 'Our Vision', 'A city where every skilled local professional has steady work and every home is well cared for.']].map(([I, t, d]) => (
          <div key={t} className="rounded-[32px] border border-mist p-8"><I className="text-gold" /><h2 className="mt-3 text-2xl font-extrabold">{t}</h2><p className="mt-2 text-navy/70">{d}</p></div>))}
      </section>
      <section className="mx-auto max-w-7xl px-4">
        <h2 className="text-4xl font-extrabold">How it <span className="hl">works</span></h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">{steps.map(([n, t, d]) => <div key={n} className="rounded-[32px] bg-mist/60 p-6"><span className="text-4xl font-light text-gold">{n}</span><h3 className="mt-2 text-xl font-bold">{t}</h3><p className="text-sm text-navy/70">{d}</p></div>)}</div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 md:grid-cols-2">
        <div className="overflow-hidden rounded-[32px] bg-navy text-white"><Img src={photo('photo-1581578731548-c64695cc6952')} alt="Eco-friendly cleaning" className="h-48" />
          <div className="p-6"><Leaf className="text-gold" /><h3 className="mt-2 text-2xl font-extrabold">Sustainability</h3><p className="mt-1 text-sm text-white/80">Eco-friendly products, reduced travel through local matching, and responsible waste handling.</p></div></div>
        <div className="overflow-hidden rounded-[32px] bg-navy text-white"><Img src={photo('photo-1560472354-b33ff0c44a43')} alt="Professional team" className="h-48" />
          <div className="p-6"><ShieldCheck className="text-gold" /><h3 className="mt-2 text-2xl font-extrabold">Trust &amp; Safety</h3><p className="mt-1 text-sm text-white/80">ID-verified experts, transparent pricing in ₹, and support for every booking.</p></div></div>
      </section>
      <section className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-4 rounded-[32px] border border-mist p-6 text-center md:grid-cols-4">{stats.map(([n, l]) => <div key={l}><p className="text-3xl font-extrabold">{n}</p><p className="text-sm text-navy/70">{l}</p></div>)}</div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-[40px] bg-gold p-8 md:p-12">
          <h2 className="text-4xl font-extrabold">Contact us</h2>
          <div className="mt-4 flex flex-col gap-3 font-semibold sm:flex-row sm:gap-8">
            <a href={`mailto:${settings.email}`} className="flex items-center gap-2"><Mail size={18} />{settings.email}</a>
            <a href={`tel:${settings.phone}`} className="flex items-center gap-2"><Phone size={18} />{settings.phone}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
