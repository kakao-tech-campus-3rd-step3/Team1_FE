import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import TobTab from '@/widgets/TobTab';
import Header from '@/widgets/Header';
import { Separator } from '@/shared/components/shadcn/separator';
import { useEffect, useState } from 'react';

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  const [activeTab, setActiveTab] = useState<'보드' | '파일' | '메모'>(
    currentPath === 'files' ? '파일' : currentPath === 'memo' ? '메모' : '보드',
  );

  const handleChangeTab = (tab: '보드' | '파일' | '메모') => {
    setActiveTab(tab);
    if (tab === '보드') navigate(`/project/${projectId}/board`);
    if (tab === '파일') navigate(`/project/${projectId}/file`);
    if (tab === '메모') navigate(`/project/${projectId}/memo`);
  };

  useEffect(() => {
    if (location.pathname === `/project/${projectId}`) {
      navigate(`/project/${projectId}/board`, { replace: true });
    }
  }, [location.pathname, projectId, navigate]);

  return (
    <div className="flex flex-col flex-1 min-w-0 h-screen">
      <TobTab activeTab={activeTab} onChangeTab={handleChangeTab} />
      <Header projectId={Number(projectId)} />
      <Separator className="bg-gray-300" />
      <Outlet />
    </div>
  );
};

export default ProjectPage;
