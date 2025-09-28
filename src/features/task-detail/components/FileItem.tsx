import fileIcon from '@/shared/assets/images/file_icon.png';
import { Trash } from 'lucide-react';
import type { FileType } from '../types/fileType';
import { FileStatusImages } from './../types/fileType';

const FileItem = ({ fileName, fileUrl, onOpenPdf, onDelete, fileSize, timeleft, status }: FileType) => {
  console.log(FileStatusImages[status])
  return (
    <div
      onClick={() => {
        onOpenPdf(fileUrl);
      }}
      className="w-full justify-between border-2 rounded-xl border-gray-300 pl-4 pr-3 pt-1 pb-1 flex items-center gap-2 hover:border-gray-400 cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <img src={fileIcon} alt="파일 아이콘" className="w-5 h-5" />
        <div className="flex-1">
          <p className="text-sm">{fileName}</p>
          <p className="text-xs pt-1 text-gray-500">
            {fileSize} | 55% | {timeleft} left | <img src={FileStatusImages[status]} alt={status} className="inline-block w-4 h-4" /> {status}
          </p>
        </div>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }}
        className="w-11 h-11 flex items-center justify-center border-1 border-gray-300 p-1 rounded-xl    hover:scale-105
                   transition-all duration-200 ease-in-out cursor-pointer"
      >
        <Trash className=" text-gray-500 w-4 h-4  hover:scale-105" />
      </div>
    </div>
  );
};

export default FileItem;
