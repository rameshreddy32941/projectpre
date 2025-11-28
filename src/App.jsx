import { Link, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import RequireAdmin from './auth/RequireAdmin'
import { useAuth } from './auth/AuthProvider'

function App() {
  const auth = useAuth()

  return (
    <div>
      <nav style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
        <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        {auth.user && (
          <span style={{ marginLeft: 12 }}>Signed in as {auth.user.username}</span>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAdmin>
              <Dashboard />
            </RequireAdmin>
          }
        />
      </Routes>
    </div>
  )
}

export default App
