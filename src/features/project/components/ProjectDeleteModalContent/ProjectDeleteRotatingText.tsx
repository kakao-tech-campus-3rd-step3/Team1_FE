import { useState, useEffect } from 'react';

const ProjectDeleteRotatingText = () => {
  const messages = [
    '이 작업은 되돌릴 수 없어요 🙅‍♂️',
    '프로젝트 정말 수고하셨어요! 🩵',
    '팀원들과 작별 인사를 해요 🥹',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <p className="text-center label1-regular text-gray-500 mb-4">{messages[currentIndex]}</p>;
};

export default ProjectDeleteRotatingText;
