import { Outlet, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProjectHeader from '@/features/project/components/ProjectPageComponents/ProjectHeader';
import ProjectTopTab from '@/features/project/components/ProjectPageComponents/ProjectTopTab';
import ProjectFilterTab from '@/features/project/components/ProjectPageComponents/ProjectFilterTab';
import { Separator } from '@/shared/components/shadcn/separator';
import { useProjectQuery } from '@/features/project/hooks/useProjectQuery';
import { Loader2 } from 'lucide-react';
import { useProjectStore } from '@/features/project/store/useProjectStore';

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: project, isLoading, isError } = useProjectQuery(projectId);
  const { setProjectData } = useProjectStore();
  const [boardTab, setBoardTab] = useState<'status' | 'member'>('status');

  useEffect(() => {
    if (project) setProjectData(project);
  }, [project, setProjectData]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );

  if (isError || !project)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        프로젝트 정보를 불러오지 못했습니다.
      </div>
    );

  return (
    <div className="flex flex-row flex-1 overflow-x-auto h-screen">
      <div className="flex-1 flex flex-col min-w-0">
        <nav aria-label="top-tab">
          <ProjectTopTab />
        </nav>

        <header aria-label="header">
          <ProjectHeader project={project} />
        </header>

        <Separator className="bg-gray-300" />

        <section aria-label="filter" className="shrink-0">
          <ProjectFilterTab value={boardTab} onChange={setBoardTab} />
        </section>

        <Separator className="bg-gray-300" />

        <section aria-label="board" className="overflow-x-auto flex-1">
          <Outlet context={{ boardTab, projectId }} />
        </section>
      </div>
    </div>
  );
};

export default ProjectPage;
