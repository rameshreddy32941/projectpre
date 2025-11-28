import { useAuth } from '../auth/AuthProvider'

export default function Dashboard() {
  const auth = useAuth()

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome, {auth.user?.username} — you have admin access.</p>
      <p>This is a basic protected dashboard page.</p>
      <button onClick={() => auth.logout()}>Logout</button>
    </div>
  )
}
