import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import TobTab from '@/widgets/TobTab';
import Header from '@/widgets/Header';
import { Separator } from '@/shared/components/shadcn/separator';
import { useEffect, useState } from 'react';
import { useProjectQuery } from '@/features/project/hooks/useProjectQuery';
import { Loader2 } from 'lucide-react';
import { useProjectStore } from '@/features/project/store/useProjectStore';

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();
  const { data: project, isLoading, isError } = useProjectQuery(projectId);
  const { setProjectData } = useProjectStore();

  useEffect(() => {
    if (project) {
      setProjectData(project);
    }
  }, [project, setProjectData]);

  const [activeTab, setActiveTab] = useState<'보드' | '파일' | '메모'>(
    currentPath === 'file' ? '파일' : currentPath === 'memo' ? '메모' : '보드',
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        프로젝트 정보를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-1 overflow-x-auto h-screen">
      <div className="flex-1 flex flex-col min-w-0">
        <nav aria-label="top-tab">
          <TobTab activeTab={activeTab} onChangeTab={handleChangeTab} />
        </nav>

        <header aria-label="header">
          <Header project={project} />
        </header>

        <Separator className="bg-gray-300" />

        <section aria-label="board" className="overflow-x-auto flex-1">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default ProjectPage;
