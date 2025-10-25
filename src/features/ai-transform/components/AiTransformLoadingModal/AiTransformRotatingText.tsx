import { useState, useEffect } from 'react';

const AiTransformRotatingText = () => {
  const messages = [
    '잠시만 기다려주세요! 🩵',
    'Boo가 댓글을 분석하는 중.. 🔎',
    'Boo가 댓글을 예쁘게 만드는 중.. 🛠️',
    '곧 완성됩니다! 기다려주셔서 감사해요 🩵',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 800);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <p className="text-center label1-regular text-gray-500 mb-4">{messages[currentIndex]}</p>;
};

export default AiTransformRotatingText;
