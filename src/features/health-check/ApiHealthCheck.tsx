import { useEffect, useState } from 'react';
import api from '@/shared/api/axiosInstance';

export default function ApiHealthCheck() {
  const [result, setResult] = useState('');

  useEffect(() => {
    api
      .get('https://api.boost.ai.kr/health')
      .then((res) => setResult(JSON.stringify(res.data)))
      .catch((err) => setResult('에러: ' + err.message));
  }, []);

  return <div>Health 체크 결과: {result}</div>;
}
