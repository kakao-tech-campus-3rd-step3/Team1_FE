import type { Variants } from 'framer-motion';

const DEFAULT_DURATION = 0.6;
const FLOAT_DURATION = 3;

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: DEFAULT_DURATION } },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: DEFAULT_DURATION } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: DEFAULT_DURATION } },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: { opacity: 1, y: 0, transition: { duration: DEFAULT_DURATION } },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: DEFAULT_DURATION } },
};

export const floatVariant: Variants = {
  animate: (distance: number = 10) => ({
    y: [0, -distance, 0],
    transition: {
      duration: FLOAT_DURATION,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
};

export const shakeVariant: Variants = {
  animate: {
    rotate: [0, -3, 3, -3, 3, 0],
    transition: {
      duration: 1,
      repeat: 1,
      ease: 'easeInOut',
    },
  },
};

export const fadeInLeftStagger: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.3, duration: 0.8 },
  }),
};
