import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4000', // 추후 백엔드 주소로 교체
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true, //쿠키를 포함한 요청을 보냅니다.
  },
});
