import { useProjectStore } from '@/features/project/store/useProjectStore';

const ProjectInfoBasicInfo = () => {
  const projectData = useProjectStore((state) => state.projectData);

  return (
    <div className="flex-1 bg-gray-50 rounded-xl p-1 space-y-10">
      <div className="flex flex-col gap-1 border-b border-gray-300 pb-4">
        <span className="subtitle1-bold">프로젝트 이름</span>
        <div className="h-10 flex items-center gap-2 subtitle2-regular pl-1">
          <span className="text-gray-800">{projectData.name}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1 border-b border-gray-300 pb-4">
        <span className="subtitle1-bold">기본 검토 수</span>
        <div className="h-10 flex items-center gap-2 subtitle2-regular pl-1">
          <span className="text-gray-800">{projectData.defaultReviewerCount}명</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoBasicInfo;
