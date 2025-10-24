import { motion } from 'framer-motion';

const AiTransformLoadingDots = () => {
  return (
    <div className="flex items-end gap-2 mt-2 h-6">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-boost-orange rounded-full shadow-sm"
          animate={{ y: [0, -10, 0] }}
          transition={{
            delay: i * 0.2,
            repeat: Infinity,
            repeatType: 'loop',
            duration: 1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default AiTransformLoadingDots;
