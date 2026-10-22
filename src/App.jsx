import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useApp } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './components/AdminLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import MyBookings from './pages/MyBookings'
import SavedServices from './pages/SavedServices'
import NotFound from './pages/NotFound'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageServices from './pages/admin/ManageServices'
import ManageBookings from './pages/admin/ManageBookings'
import ManageUsers from './pages/admin/ManageUsers'
import AdminSettings from './pages/admin/AdminSettings'

function CustomerLayout() {
  return (<ProtectedRoute><Header /><Outlet /><Footer /></ProtectedRoute>)
}

export default function App() {
  const { toast } = useApp()
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/saved" element={<SavedServices />} />
        </Route>
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {toast && <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-xl"><span className="mr-2 text-gold">●</span>{toast}</div>}
    </>
  )
}
