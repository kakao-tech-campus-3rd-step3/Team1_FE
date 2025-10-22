import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TopTab from '@/widgets/TopTab';

const ProjectTopTab = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.split('/').pop();
  const [activeTab, setActiveTab] = useState<'보드' | '파일' | '메모'>(
    currentPath === 'file' ? '파일' : currentPath === 'memo' ? '메모' : '보드',
  );

  const handleChangeTab = (tab: '보드' | '파일' | '메모') => {
    setActiveTab(tab);
    if (tab === '보드') navigate(`/project/${projectId}/board`);
    if (tab === '파일') navigate(`/project/${projectId}/file`);
    if (tab === '메모') navigate(`/project/${projectId}/memo`);
  };

  // 초기 redirect 처리
  useEffect(() => {
    if (location.pathname === `/project/${projectId}`) {
      navigate(`/project/${projectId}/board`, { replace: true });
    }
  }, [location.pathname, projectId, navigate]);

  return <TopTab activeTab={activeTab} onChangeTab={handleChangeTab} showTabs={true} />;
};

export default ProjectTopTab;
