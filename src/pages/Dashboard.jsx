import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useAuth } from '../auth/AuthProvider'
import StudentProfile from '../components/StudentProfile'
import AnimatedCard from '../components/AnimatedCard'
import SkeletonLoader from '../components/SkeletonLoader'

export default function Dashboard() {
  const auth = useAuth()
  const [feedbackData, setFeedbackData] = useState([
    { month: 'Jan', rating: 3.5, count: 12 },
    { month: 'Feb', rating: 4.0, count: 15 },
    { month: 'Mar', rating: 3.8, count: 14 },
  ])
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  const addFeedback = (e) => {
    e.preventDefault()
    if (!feedback.trim()) return

    // Simulate new feedback and update chart with animation
    const newRating = parseFloat((Math.random() * 2 + 3).toFixed(1))
    setFeedbackData((prev) => {
      const newData = [...prev]
      if (newData.length > 0) {
        newData[newData.length - 1].rating = newRating
        newData[newData.length - 1].count += 1
      }
      return newData
    })

    setFeedback('')
  }

  const chartVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: 30, maxWidth: 1200, margin: '0 auto' }}
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 10 }}
      >
        Welcome, {auth.user?.username} 👋
      </motion.h2>

      {loading ? (
        <SkeletonLoader count={2} height={250} />
      ) : (
        <>
          {/* Student Profile Section */}
          <StudentProfile user={auth.user} />

          {/* Feedback History */}
          <motion.div variants={chartVariants} initial="hidden" animate="visible">
            <AnimatedCard>
              <h3 style={{ marginTop: 0 }}>📊 Rating Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={feedbackData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#667eea"
                    strokeWidth={2}
                    isAnimationActive
                    dot={{ fill: '#667eea', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </AnimatedCard>
          </motion.div>

          {/* Feedback Count */}
          <motion.div
            variants={chartVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            style={{ marginTop: 20 }}
          >
            <AnimatedCard>
              <h3 style={{ marginTop: 0 }}>📈 Feedback Count</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={feedbackData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    fill="#764ba2"
                    isAnimationActive
                    animationDuration={600}
                  />
                </BarChart>
              </ResponsiveContainer>
            </AnimatedCard>
          </motion.div>

          {/* Submit Feedback */}
          <motion.div
            variants={chartVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            style={{ marginTop: 20 }}
          >
            <AnimatedCard>
              <h3 style={{ marginTop: 0 }}>💬 Submit Feedback</h3>
              <form onSubmit={addFeedback}>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter your feedback here..."
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 8,
                    border: '2px solid #e0e0e0',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    minHeight: 100,
                    transition: 'all 0.3s ease',
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  style={{
                    marginTop: 12,
                    padding: '10px 20px',
                    borderRadius: 8,
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Submit & Update Chart 🚀
                </motion.button>
              </form>
            </AnimatedCard>
          </motion.div>

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ marginTop: 30, textAlign: 'center' }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => auth.logout()}
              style={{
                padding: '12px 30px',
                borderRadius: 8,
                border: '2px solid #667eea',
                background: 'transparent',
                color: '#667eea',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: 16,
                transition: 'all 0.3s ease',
              }}
            >
              Logout
            </motion.button>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
