import { Button } from '@/shared/components/shadcn/button';
import { ChevronRight, Download } from 'lucide-react';
import { mockAllFiles } from '@/shared/data/mockAllFiles';
import { DropdownMenu, DropdownMenuTrigger } from '@/shared/components/shadcn/dropdown-menu';
import { getFileIcon } from '@/features/file/utils/fileUtils';
import { useNavigate } from 'react-router';
import { ROUTE_PATH } from '@/app/routes/Router';

const FilePage = () => {
  const files = mockAllFiles;
  const navigate = useNavigate();
  return (
    <div className="p-6  bg-gray-50">
      <div>
        <div className=" mx-auto">
          <div className="mb-8">
            <p className="font-bold text-gray-700">프로젝트 중 업로드한 작업물을 관리하세요</p>
          </div>
          {/* File List */}
          <div className="flex flex-col gap-4">
            {files.map((file) => (
              <div key={file.id} className="p-4 bg-white rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 ">
                    <div className="w-10 h-10  flex items-center justify-center flex-shrink-0">
                      <img src={getFileIcon(file.type)} alt="" />{' '}
                    </div>

                    <div className=" min-w-0">
                      <h3 className="font-medium text-gray-900 ">{file.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {file.size} · {file.date}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      navigate(ROUTE_PATH.TASK_DETAIL);
                    }}
                    variant="outline"
                    size="sm"
                    className="text-sm border-gray-400"
                  >
                    {file.taskName}
                  </Button>

                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                      <Download className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                          <ChevronRight />
                        </Button>
                      </DropdownMenuTrigger>
                      {/* <DropdownMenuContent align="end"> */}
                      {/* <DropdownMenuItem>이름 변경</DropdownMenuItem> */}
                      {/* </DropdownMenuContent> */}
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
