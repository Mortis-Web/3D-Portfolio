import { motion } from 'framer-motion';

export default function ParticleDiv() {
  const particles = Array.from({ length: 20 });

  return (
    <div className="absolute  bottom-1 h-64 w-full overflow-hidden rounded-2xl bg-black">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 z-50 h-1 w-1 rounded-full bg-gray-400"
          style={{
            left: `${(i / particles.length) * 100}%`, // evenly spread horizontally
          }}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '-100%', opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + Math.random() * 2, // varied speed
            repeat: Infinity,
            delay: i * 0.3, // staggered start
          }}
        />
      ))}
    </div>
  );
}
