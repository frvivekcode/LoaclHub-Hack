import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AuthContext'
import { AuthShell, PasswordInput } from './Login'

export default function Register() {
  const { register, user } = useApp()
  const nav = useNavigate()
  const [f, setF] = useState({ name: '', email: '', password: '', confirm: '' })
  const [err, setErr] = useState('')
  if (user) return <Navigate to="/" replace />
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    if (f.name.trim().length < 2) return setErr('Enter your full name')
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Enter a valid email address')
    if (f.password.length < 6) return setErr('Password must be at least 6 characters')
    if (f.password !== f.confirm) return setErr('Passwords do not match')
    const r = register(f.name, f.email, f.password)
    if (r.error) return setErr(r.error)
    nav('/', { replace: true })
  }
  return (
    <AuthShell title="Create your" hl="account">
      <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
        <div><label className="label" htmlFor="n">Full name</label><input id="n" className="input" value={f.name} onChange={set('name')} /></div>
        <div><label className="label" htmlFor="e">Email</label><input id="e" type="email" className="input" value={f.email} onChange={set('email')} /></div>
        <div><label className="label" htmlFor="p">Password</label><PasswordInput id="p" value={f.password} onChange={set('password')} /></div>
        <div><label className="label" htmlFor="c">Confirm password</label><PasswordInput id="c" value={f.confirm} onChange={set('confirm')} /></div>
        {err && <p className="err">{err}</p>}
        <button className="btn-dark w-full">Register</button>
      </form>
      <p className="mt-4 text-sm">Already have an account? <Link className="font-bold underline" to="/login">Login</Link></p>
    </AuthShell>
  )
}
