import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../auth/AuthProvider'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const auth = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required')
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const success = auth.login(username.trim(), password.trim())
      if (!success) {
        setError('Login failed. Please try again.')
      }
      setIsLoading(false)
    }, 800)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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
        maxWidth: 420,
        margin: '50px auto',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 16,
        color: '#fff',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}
    >
      <motion.h2 variants={itemVariants} style={{ marginBottom: 10, textAlign: 'center', fontSize: 28 }}>
        Student Login
      </motion.h2>
      <motion.p
        variants={itemVariants}
        style={{ textAlign: 'center', opacity: 0.9, marginBottom: 30, fontSize: 14 }}
      >
        Welcome back! Sign in to your account
      </motion.p>

      <motion.form onSubmit={handleSubmit} variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Username Field */}
        <motion.div variants={itemVariants}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
            Username
          </label>
          <motion.input
            variants={inputVariants}
            whileFocus="focus"
            type="text"
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

        {/* Password Field */}
        <motion.div variants={itemVariants}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
            Password
          </label>
          <motion.input
            variants={inputVariants}
            whileFocus="focus"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
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

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: 12,
              borderRadius: 8,
              background: 'rgba(255, 100, 100, 0.3)',
              fontSize: 14,
              textAlign: 'center',
              border: '1px solid rgba(255, 100, 100, 0.6)',
            }}
          >
            {error}
          </motion.div>
        )}

        {/* Submit Button */}
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
          {isLoading ? '🔄 Signing in...' : 'Sign In'}
        </motion.button>
      </motion.form>

      <motion.div
        variants={itemVariants}
        style={{
          marginTop: 20,
          padding: 12,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.15)',
          fontSize: 12,
          textAlign: 'center',
          lineHeight: 1.6,
        }}
      >
        <strong>Demo Credentials:</strong>
        <br />
        Any username + any password works!
        <br />
        Try: <code style={{ background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: 4 }}>john123</code> / <code style={{ background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: 4 }}>pass</code>
      </motion.div>
    </motion.div>
  )
}
