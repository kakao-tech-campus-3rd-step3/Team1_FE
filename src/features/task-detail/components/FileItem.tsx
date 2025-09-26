import fileIcon from '@/shared/assets/images/file_icon.png'
import { Trash } from 'lucide-react';
const FileItem = () => {

  return (
    <div className="w-full border-2 rounded-xl border-gray-300 pl-4 pr-3 pt-3 pb-3 flex items-center gap-2">
      <img src={fileIcon} alt="파일 아이콘" className="w-5 h-5" />
      <p>파일명.pdf</p>
      <Trash/>
    </div>
  );
}

export default FileItem
