import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div><p className="text-8xl font-extrabold">4<span className="hl">0</span>4</p><p className="mt-3 text-navy/70">This page doesn’t exist.</p><Link to="/" className="btn-dark mt-6">Go Home</Link></div>
    </div>
  )
}
