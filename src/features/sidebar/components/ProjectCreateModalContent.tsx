import { Input } from '@/shared/components/shadcn/input';
import { useState } from 'react';

const ProjectCreateModalContent = () => {
  const [name, setName] = useState('');
  return (
    <Input
      value={name}
      placeholder="프로젝트 이름을 입력해주세요."
      onChange={(e) => setName(e.target.value)}
      className="border-gray-400 h-10 focus:ring-transparent focus:border-gray-600"
    />
  );
};
export default ProjectCreateModalContent;
