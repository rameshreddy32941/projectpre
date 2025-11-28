import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function RequireAdmin({ children }) {
  const auth = useAuth()

  if (!auth.user) {
    // not logged in
    return <Navigate to="/login" replace />
  }

  if (auth.user.role !== 'admin') {
    // logged in but not admin - send to login (or show unauthorized)
    return <Navigate to="/login" replace />
  }

  return children
}
