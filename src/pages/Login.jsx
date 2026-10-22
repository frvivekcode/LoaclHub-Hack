import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useApp } from '../context/AuthContext'
import { Img } from '../components/ServiceCard'

export function AuthShell({ title, hl, children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden bg-navy p-10 text-white lg:block">
        <Img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=70" alt="Modern home interior" className="absolute inset-6 rounded-[40px]" />
        <div className="absolute inset-6 rounded-[40px] bg-gradient-to-t from-navy via-navy/30 to-transparent" />
        <div className="absolute bottom-16 left-16 right-16">
          <h2 className="text-5xl font-extrabold leading-tight">Local experts, <span className="hl">booked</span> in minutes.</h2>
          <p className="mt-3 text-white/80">Cleaning, repairs, salon and more at your doorstep.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/login" className="mb-8 flex items-center gap-2 text-2xl font-extrabold"><span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-gold">L</span>LocalHub</Link>
          <h1 className="text-4xl font-extrabold">{title} <span className="hl">{hl}</span></h1>
          {children}
        </div>
      </div>
    </div>
  )
}

export function PasswordInput({ id, value, onChange }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <input id={id} type={show ? 'text' : 'password'} className="input pr-12" value={value} onChange={onChange} />
      <button type="button" aria-label="Toggle password" onClick={() => setShow(!show)} className="absolute right-4 top-3.5 text-navy/60">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
    </div>
  )
}

export default function Login() {
  const { login, user } = useApp()
  const nav = useNavigate()
  const [f, setF] = useState({ email: '', password: '' })
  const [err, setErr] = useState('')
  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />
  const submit = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Enter a valid email address')
    if (f.password.length < 6) return setErr('Password must be at least 6 characters')
    const u = login(f.email, f.password)
    if (!u) return setErr('Invalid email or password')
    nav(u.role === 'admin' ? '/admin' : '/', { replace: true })
  }
  return (
    <AuthShell title="Welcome" hl="back">
      <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
        <div><label className="label" htmlFor="email">Email</label><input id="email" type="email" className="input" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
        <div><label className="label" htmlFor="pw">Password</label><PasswordInput id="pw" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></div>
        {err && <p className="err">{err}</p>}
        <button className="btn-dark w-full">Login</button>
      </form>
      <p className="mt-4 text-sm">New here? <Link className="font-bold underline" to="/register">Create an account</Link></p>
      <div className="mt-6 rounded-3xl bg-mist/60 p-4 text-sm">
        <p className="font-bold">Demo accounts</p>
        <p className="mt-1">Customer: <b>user@localhub.com</b> / user123</p>
        <p>Admin: <b>admin@localhub.com</b> / admin123</p>
        <p className="mt-2 text-xs text-navy/60">Frontend demo only — LocalStorage login is not secure for production.</p>
      </div>
    </AuthShell>
  )
}
