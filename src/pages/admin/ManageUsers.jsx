import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useApp } from '../../context/AuthContext'

export default function ManageUsers() {
  const { users, user, deleteUser, notify } = useApp()
  const [q, setQ] = useState('')
  const list = users.filter((u) => (u.name + u.email).toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <h1 className="text-3xl font-extrabold">Manage <span className="hl">users</span></h1>
      <input aria-label="Search" placeholder="Search by name or email" className="input mt-4" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="mt-4 overflow-x-auto rounded-[28px] bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-xs uppercase text-navy/60"><tr><th className="p-4">Name</th><th>Email</th><th>Role</th><th>Created</th><th className="pr-4 text-right">Action</th></tr></thead>
          <tbody>{list.map((u) => (
            <tr key={u.id} className="border-t border-mist"><td className="p-4 font-bold">{u.name}</td><td>{u.email}</td>
              <td><span className={`rounded-full px-2 py-1 text-xs font-bold ${u.role === 'admin' ? 'bg-navy text-white' : 'bg-gold/30'}`}>{u.role}</span></td>
              <td>{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
              <td className="pr-4 text-right">{u.role === 'customer' && u.id !== user.id ? (
                <button aria-label="Delete user" className="p-2 text-red-600" onClick={() => { if (window.confirm(`Delete ${u.name}? Their bookings and saved services will also be removed.`)) { deleteUser(u.id); notify('User deleted') } }}><Trash2 size={16} /></button>) : <span className="text-xs text-navy/40">Protected</span>}</td></tr>))}
            {list.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-navy/60">No users found.</td></tr>}</tbody>
        </table>
      </div>
    </div>
  )
}
