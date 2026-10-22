const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`
export const CATEGORIES = ['Cleaning', 'Plumbing', 'Electrical', 'Salon', 'Painting', 'Appliance Repair']
export const CITIES = ['Jaipur', 'Delhi', 'Mumbai', 'Bengaluru', 'Kolkata', 'Pune']
export const defaultServices = [
  { id: 's1', name: 'Deep Home Cleaning', category: 'Cleaning', description: 'Full home deep clean with eco-friendly products.', price: 2499, rating: 4.8, experts: 120, image: u('photo-1581578731548-c64695cc6952'), active: true },
  { id: 's2', name: 'Plumbing Repair', category: 'Plumbing', description: 'Leak fixing, tap and pipe installation by verified plumbers.', price: 499, rating: 4.6, experts: 85, image: u('photo-1585704032915-c3400ca199e7'), active: true },
  { id: 's3', name: 'Electrician Visit', category: 'Electrical', description: 'Wiring, switches, fans and fittings handled safely.', price: 399, rating: 4.7, experts: 95, image: u('photo-1621905251918-48416bd8575a'), active: true },
  { id: 's4', name: 'Salon at Home', category: 'Salon', description: 'Haircut, facial and grooming at your doorstep.', price: 899, rating: 4.9, experts: 60, image: u('photo-1487412947147-5cebf100ffc2'), active: true },
  { id: 's5', name: 'Interior Painting', category: 'Painting', description: 'Neat, dust-free wall painting with premium paints.', price: 5999, rating: 4.5, experts: 40, image: u('photo-1562259949-e8e7689d7828'), active: true },
  { id: 's6', name: 'AC Service & Repair', category: 'Appliance Repair', description: 'Cleaning, gas refill and repair for all AC brands.', price: 699, rating: 4.7, experts: 70, image: u('photo-1631545806609-1f0ae7a4ec6e'), active: true },
  { id: 's7', name: 'Kitchen Cleaning', category: 'Cleaning', description: 'Chimney, tiles, cabinets and appliances degreased.', price: 1499, rating: 4.6, experts: 55, image: u('photo-1556911220-e15b29be8c8f'), active: true },
  { id: 's8', name: 'Washing Machine Repair', category: 'Appliance Repair', description: 'Quick diagnosis and genuine-part replacement.', price: 549, rating: 4.4, experts: 48, image: u('photo-1626806787461-102c1bfaaea1'), active: true },
]
export const defaultUsers = [
  { id: 'u_admin', name: 'LocalHub Admin', email: 'admin@localhub.com', password: 'admin123', role: 'admin', createdAt: new Date().toISOString() },
  { id: 'u_demo', name: 'Demo Customer', email: 'user@localhub.com', password: 'user123', role: 'customer', createdAt: new Date().toISOString() },
]
export const defaultSettings = {
  brand: 'LocalHub', tagline: 'Trusted local experts for every home need',
  email: 'vivekmandal8810@gmail.com', phone: '8810224248', city: 'Jaipur', currency: 'INR (₹)',
  autoConfirm: false, allowCancel: true,
}
