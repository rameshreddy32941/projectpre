import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = (username) => {
    // Simple role assignment: username 'admin' => admin role, others => user
    const role = username === 'admin' ? 'admin' : 'user'
    const nextUser = { username, role }
    setUser(nextUser)
    // If admin, send to dashboard; otherwise stay on login
    if (role === 'admin') navigate('/dashboard')
  }

  const logout = () => {
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
