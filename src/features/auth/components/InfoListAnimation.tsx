import { fadeInLeftStagger } from '@/shared/utils/animations/motionVariants';
import { motion } from 'framer-motion';

const boostInfo = [
  { icon: '⚡', keyLetter: 'B', title: 'etter', desc: '더 나은 성장과 개선' },
  { icon: '💬', keyLetter: 'O', title: 'pinion', desc: '솔직한 의견 공유' },
  { icon: '📂', keyLetter: 'O', title: 'rganize', desc: '체계적 관리와 정리' },
  { icon: '✨', keyLetter: 'S', title: 'imple', desc: '누구나 쉽게 사용 가능' },
  { icon: '🤝', keyLetter: 'T', title: 'ogether', desc: '함께 만드는 협업 경험' },
];

const InfoListAnimation = () => {
  return (
    <div className="flex flex-col space-y-3 mt-8 w-full max-w-sm mx-auto pl-12">
      {boostInfo.map((info, index) => (
        <motion.div
          key={info.title}
          className="flex items-center gap-3"
          custom={index}
          variants={fadeInLeftStagger}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-white/40 rounded-lg">
            <span className="text-xl">{info.icon}</span>
          </div>
          <div>
            <span className="text-white title2-regular">
              <strong className="text-boost-blue-light">{info.keyLetter}</strong>
              {info.title}: {info.desc}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default InfoListAnimation;
