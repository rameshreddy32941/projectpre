import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function RequireAdmin({ children }) {
  const auth = useAuth()

  // Allow any logged-in user
  if (!auth.user) {
    return <Navigate to="/login" replace />
  }

  return children
}
