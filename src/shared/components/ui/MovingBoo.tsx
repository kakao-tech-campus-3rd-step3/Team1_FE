import { motion } from 'framer-motion';
import Boo from '@/shared/assets/images/boost/boo.png';

const MovingBoo = () => (
  <div className="flex justify-center items-center py-15">
    <motion.img
      src={Boo}
      className="w-32 h-32"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

export default MovingBoo;
