import { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'

export default function Login() {
  const [username, setUsername] = useState('')
  const [msg, setMsg] = useState('')
  const auth = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username.trim()) {
      setMsg('Please enter a username')
      return
    }
    auth.login(username.trim())
    // if non-admin, show notice
    if (username.trim() !== 'admin') {
      setMsg('Logged in as non-admin — only admins can access the dashboard.')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:{' '}
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <button type="submit" style={{ marginLeft: 8 }}>Login</button>
      </form>
      {msg && <p style={{ color: '#b03' }}>{msg}</p>}
      <p>Tip: enter <strong>admin</strong> to sign in as an administrator.</p>
    </div>
  )
}
