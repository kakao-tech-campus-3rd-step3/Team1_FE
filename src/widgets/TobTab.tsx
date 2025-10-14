import { Clipboard, FileTextIcon, Edit2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const tabs = [
  { label: '보드', icon: Clipboard },
  { label: '파일', icon: FileTextIcon },
  { label: '메모', icon: Edit2 },
] as const;

type Tab = (typeof tabs)[number]['label'];

interface TobTabProps {
  activeTab: Tab;
  onChangeTab: (tab: Tab) => void;
}

const TobTab = ({ activeTab, onChangeTab }: TobTabProps) => {
  return (
    <nav className="w-full bg-gray-100 border-b border-gray-300 subtitle2-bold">
      <ul className="flex h-12 pl-5">
        {tabs.map(({ label, icon: Icon }) => (
          <li
            key={label}
            className={cn(
              'flex items-center gap-2 px-4 border-r border-gray-200 last:border-r-0 cursor-pointer border-b-3',
              activeTab === label
                ? 'border-b-boost-blue text-boost-blue'
                : 'border-b-transparent subtitle2-regular text-gray-600 hover:text-gray-700',
            )}
            onClick={() => onChangeTab(label)}
          >
            <Icon className="w-4 h-4" />
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TobTab;
