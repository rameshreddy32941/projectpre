import { motion } from 'framer-motion'

export default function StudentProfile({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: 20,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 12,
        color: '#fff',
        marginBottom: 20,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 'bold',
            color: '#667eea',
          }}
        >
          {user?.username?.[0]?.toUpperCase() || 'S'}
        </motion.div>
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: 20 }}>
            {user?.username || 'Student'}
          </h3>
          <p style={{ margin: '0 0 4px 0', fontSize: 14, opacity: 0.9 }}>
            ID: STU{Math.random().toString().slice(2, 8).toUpperCase()}
          </p>
          <p style={{ margin: '0', fontSize: 14, opacity: 0.9 }}>
            Year: 2nd | Branch: CSE
          </p>
        </div>
      </div>
    </motion.div>
  )
}
