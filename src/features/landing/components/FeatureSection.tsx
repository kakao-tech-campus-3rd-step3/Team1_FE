import { motion } from 'framer-motion';
import { fadeInDown, fadeInLeft, fadeInRight, fadeInUp, scaleUp } from '@/shared/utils/animation';

interface FeatureSectionProps {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  animationType?: 'left' | 'right' | 'up' | 'down' | 'scale';
}

const animationVariants = {
  left: fadeInLeft,
  right: fadeInRight,
  up: fadeInUp,
  down: fadeInDown,
  scale: scaleUp,
};

const FeaturesSection = ({
  title,
  subtitle,
  description,
  image,
  animationType = 'left',
}: FeatureSectionProps) => {
  return (
    <section
      id="about"
      className={`flex flex-col items-center justify-between max-w-6xl mx-auto py-20 px-6 gap-12 ${animationType === 'left' ? 'ml-30' : ''} ${animationType === 'right' ? 'mr-30' : ''}`}
    >
      <motion.div
        className={`flex-1`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={animationVariants[animationType]}
      >
        <h2 className="text-4xl font-bold mb-4 items-center">{title}</h2>
        <p className="title1-regular text-gray-600 mb-4">{subtitle}</p>
        <p className="subtitle1-regular text-gray-500">{description}</p>
      </motion.div>

      {image && (
        <motion.img
          src={image}
          alt={title}
          className="flex-1 max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={animationVariants[animationType]}
        />
      )}
    </section>
  );
};

export default FeaturesSection;
