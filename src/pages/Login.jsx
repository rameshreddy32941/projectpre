import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../auth/AuthProvider'

export default function Login() {
  const [username, setUsername] = useState('')
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const auth = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim()) {
      setMsg('Please enter a username')
      return
    }
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      auth.login(username.trim())
      setIsLoading(false)
      if (username.trim() !== 'admin') {
        setMsg('Logged in as non-admin — only admins can access the dashboard.')
      }
    }, 800)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)' },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        padding: 40,
        maxWidth: 400,
        margin: '50px auto',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 16,
        color: '#fff',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}
    >
      <motion.h2 variants={itemVariants} style={{ marginBottom: 30, textAlign: 'center' }}>
        Student Login
      </motion.h2>

      <motion.form onSubmit={handleSubmit} variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <motion.div variants={itemVariants}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
            Username
          </label>
          <motion.input
            variants={inputVariants}
            whileFocus="focus"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '2px solid transparent',
              background: 'rgba(255,255,255,0.9)',
              fontSize: 16,
              transition: 'all 0.3s ease',
              boxSizing: 'border-box',
            }}
          />
        </motion.div>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isLoading}
          style={{
            padding: 12,
            borderRadius: 8,
            border: 'none',
            background: '#fff',
            color: '#667eea',
            fontWeight: 'bold',
            fontSize: 16,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
            transition: 'all 0.3s ease',
          }}
        >
          {isLoading ? '🔄 Logging in...' : 'Login'}
        </motion.button>
      </motion.form>

      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 8,
            background: 'rgba(255, 255, 255, 0.2)',
            fontSize: 14,
            textAlign: 'center',
          }}
        >
          {msg}
        </motion.p>
      )}

      <motion.p
        variants={itemVariants}
        style={{
          marginTop: 20,
          fontSize: 13,
          textAlign: 'center',
          opacity: 0.9,
        }}
      >
        Tip: enter <strong>admin</strong> to sign in as an administrator.
      </motion.p>
    </motion.div>
  )
}
