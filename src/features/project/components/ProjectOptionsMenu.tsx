import { Button } from '@/shared/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/dropdown-menu';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useDeleteProjectMutation } from '@/features/project/hooks/useDeleteProjectMutation';
import toast from 'react-hot-toast';

interface ProjectOptionsMenuProps {
  projectId: string;
}

const ProjectOptionsMenu = ({ projectId }: ProjectOptionsMenuProps) => {
  const { mutate: deleteProject } = useDeleteProjectMutation();

  const handleDelete = () => {
    if (!confirm('정말로 프로젝트를 삭제하시겠습니까?')) return;
    deleteProject(projectId, {
      onSuccess: () => toast.success('프로젝트가 삭제되었습니다.'),
      onError: () => toast.error('삭제에 실패했습니다.'),
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="border-gray-300">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 border-gray-500">
        <DropdownMenuItem onClick={() => alert('수정 기능은 곧 제공됩니다.')}>
          <Edit2 className="mr-2 h-4 w-4" /> 수정
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" /> 삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectOptionsMenu;
