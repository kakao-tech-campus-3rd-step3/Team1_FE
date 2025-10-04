import { useAuthStore } from '@/features/auth/store/authStore';
import { useEffect, useState } from 'react';

interface JwtPayload {
  sub: string;
  auth: string;
  name: string;
  avatar: string;
  exp: number;
}

const MyInfoPage = () => {
  const [userInfo, setUserInfo] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      const base64Payload = token.split('.')[1];
      const payload = JSON.parse(
        decodeURIComponent(
          Array.from(atob(base64Payload))
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join(''),
        ),
      );
      setUserInfo(payload);
    }
  }, []);

  if (!userInfo) return <p>정보 없음</p>;

  return (
    <div className="p-4">
      <h1>내 정보 (JWT 기반)</h1>
      <ul>
        {Object.entries(userInfo).map(([key, value]) => (
          <li key={key}>
            <strong>{key}</strong>: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyInfoPage;
