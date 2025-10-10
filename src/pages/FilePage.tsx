import { Button } from '@/shared/components/shadcn/button';
import { Download, MoreVertical } from 'lucide-react';
import { mockAllFiles } from '@/shared/data/mockAllFiles';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/dropdown-menu';

const FilePage = () => {
const files = mockAllFiles
  const getFileIcon = (type:string) => {
    return (
      <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-bold uppercase">{type}</span>
      </div>
    );
  };
  return (
    <div className="p-6 bg-gray-50">
      <div>
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <p className="font-bold text-gray-700">프로젝트 중 업로드한 작업물을 관리하세요</p>
          </div>

          {/* File List */}

          <div className="flex flex-col gap-4">
            {files.map((file) => (
              <div key={file.id} className="p-4 bg-white rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 ">
                    {getFileIcon(file.type)}

                    <div className=" min-w-0">
                      <h3 className="font-medium text-gray-900 ">{file.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {file.size} · {file.date}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-sm border-gray-400">
                    {file.taskName}
                  </Button>

                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                      <Download className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* <DropdownMenuItem>이름 변경</DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <p>총 {files.length}개 파일</p>
            <p>
              전체 용량:{' '}
              {files
                .reduce((acc, file) => {
                  const size = parseFloat(file.size);
                  return acc + (file.size.includes('MB') ? size : size / 1024);
                }, 0)
                .toFixed(1)}{' '}
              MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePage;
