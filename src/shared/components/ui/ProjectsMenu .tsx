import type { SidebarItem } from '@/widgets/AppSidebar';
import {
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '../shadcn/sidebar';
import { Plus } from 'lucide-react';
import React from 'react';
interface SidebarMenuItemProps {
  item: SidebarItem;
}
const ProjectsMenu = ({item }:SidebarMenuItemProps  )  => {
  const [open, setOpen] = React.useState(false);

  return (
<>
{open && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-xl shadow-lg p-6 w-[400px]">
      <h2 className="text-lg font-semibold mb-4">프로젝트 생성</h2>
      <input
        type="text"
        placeholder="프로젝트 이름"
        className="w-full border rounded-md px-3 py-2 mb-4"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-2 rounded-md border"
        >
          취소
        </button>
        <button className="px-4 py-2 rounded-md bg-blue-600 text-white">
          생성
        </button>
      </div>
    </div>
  </div>
)}<SidebarMenuButton >
            {item.icon}
            <span>{item.title}</span>

                            <Plus  onClick={()=>{setOpen(true)}
                            }
                            className={`ml-auto h-4 w-4 transition-transform duration-200`}/>

        </SidebarMenuButton>


        <SidebarMenuSub>
          <SidebarMenuSubButton asChild>
            <a href="/projects/1">
              <span className="flex-1 text-left">프로젝트vmf 1</span>
            </a>
          </SidebarMenuSubButton>
          <SidebarMenuSubButton asChild>
            <a href="/projects/2">
              <span className="flex-1 text-left">프로젝트 2</span>
            </a>
          </SidebarMenuSubButton>
          <SidebarMenuSubButton asChild>
            <a href="/projects/3">
              <span className="flex-1 text-left">프로젝트 3</span>
            </a>
          </SidebarMenuSubButton>
        </SidebarMenuSub>
</>
        
  );
};

export default  ProjectsMenu;
