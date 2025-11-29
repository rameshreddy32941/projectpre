import { motion } from 'framer-motion'

export default function SkeletonLoader({ count = 3, height = 200 }) {
  const pulseVariants = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
  }

  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="skeleton-item"
          style={{
            height,
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            borderRadius: 8,
            marginBottom: 16,
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
