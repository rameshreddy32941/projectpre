import { motion } from 'framer-motion'

export default function AnimatedCard({ children, delay = 0, onClick = null }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
      onClick={onClick}
      style={{
        padding: 16,
        border: '1px solid #e0e0e0',
        borderRadius: 12,
        background: '#fff',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
      }}
    >
      {children}
    </motion.div>
  )
}
