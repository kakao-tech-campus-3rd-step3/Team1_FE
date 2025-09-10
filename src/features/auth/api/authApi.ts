import { api } from '@/shared/api/axiosInstance';

export interface LoginDto {
  id: string;
  password: string;
}

// //로그인
// export const login = async (data: LoginDto) => {
//   const res = await api.post('/auth/login', data);
//   return res.data;
// };
//로그아웃
export const logout = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};
//토큰 재발급
export const refreshToken = async () => {
  const res = await api.post('/auth/refresh');
  return res.data;
};
