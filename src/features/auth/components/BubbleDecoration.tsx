import { floatVariant } from '@/shared/utils/animations/motionVariants';
import BoostRocket from '@/shared/assets/images/boost/rocket-2d.png';
import { motion } from 'framer-motion';

const BubbleDecoration = () => {
  return (
    <motion.div
      className="absolute -top-13 flex flex-col items-center"
      variants={floatVariant}
      animate="animate"
      custom={5}
    >
      <div className="flex flex-row items-center gap-1 border border-boost-blue-dark/30 text-gray-700 px-3 py-2 rounded-full shadow-md label1-regular">
        <img src={BoostRocket} alt="boost-rocket" className="w-5.5" />
        5초 안에 회원가입
      </div>
    </motion.div>
  );
};

export default BubbleDecoration;
