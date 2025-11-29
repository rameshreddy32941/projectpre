import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Failed to parse stored user:', e)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (username, password) => {
    // Accept any non-empty username + password
    if (!username.trim() || !password.trim()) {
      return false
    }

    const nextUser = {
      username: username.trim(),
      email: `${username.trim()}@student.edu`,
      loginTime: new Date().toISOString(),
    }

    setUser(nextUser)
    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(nextUser))
    // Redirect to dashboard
    navigate('/dashboard')
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
