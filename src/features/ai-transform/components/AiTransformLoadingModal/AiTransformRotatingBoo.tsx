import { useState, useEffect } from 'react';
import BooFront from '@/shared/assets/images/boost/boo-front.png';
import BooBack from '@/shared/assets/images/boost/boo-back.png';
import BooLeft from '@/shared/assets/images/boost/boo-left.png';
import BooRight from '@/shared/assets/images/boost/boo-right.png';

const AiTransformRotatingBoo = () => {
  const images = [BooFront, BooRight, BooBack, BooLeft];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 300);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center items-center my-3">
      <img
        src={images[currentIndex]}
        alt="Boo loading"
        className="w-30 h-30 transition-transform duration-200"
      />
    </div>
  );
};

export default AiTransformRotatingBoo;
