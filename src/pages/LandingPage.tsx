import { Button } from '@/shared/components/shadcn/button';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/routes/Router';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <p>UI 및 라우팅 테스트 중입니다 ㅎㅎ</p>
      <Button onClick={() => navigate('/project/123')}>프로젝트1 페이지</Button>
      <Button onClick={() => navigate('/project/124')}>프로젝트2 페이지</Button>
      <Button onClick={() => navigate(ROUTE_PATH.MYTASK)}>나의 할 일 페이지</Button>
      <Button onClick={() => navigate(ROUTE_PATH.LOGIN)}>로그인 페이지</Button>
      <Button onClick={()=>{navigate(ROUTE_PATH.ERROR)}}>에러 페이지</Button>
    </div>
  );
};

export default LandingPage;
