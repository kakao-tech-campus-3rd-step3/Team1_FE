import { useEffect, useState } from 'react';

export const useCountdown = (expireAt: string | null) => {
  const [remaining, setRemaining] = useState<number>(0);
  useEffect(() => {
    if (!expireAt) return;
    const target = new Date(expireAt).getTime();

    const update = () => {
      const diff = Math.max(0, target - Date.now());
      setRemaining(diff);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [expireAt]);

  const seconds = Math.floor((remaining / 1000) % 60);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);

  return { minutes, seconds, isExpired: remaining <= 0 };
};
