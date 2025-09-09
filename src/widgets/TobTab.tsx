import { useState } from 'react';
import { Clipboard, FileTextIcon, Edit2 } from 'lucide-react';

const tabs = [
  { label: '보드', icon: Clipboard },
  { label: '파일', icon: FileTextIcon },
  { label: '메모', icon: Edit2 },
] as const;

type Tab = (typeof tabs)[number]['label'];

export default function TopTab() {
  const [activeTab, setActiveTab] = useState<Tab>('보드');

  return (
    <nav className="w-full bg-gray-100 border-b border-gray-300 subtitle2-bold">
      <ul className="flex h-12 pl-5">
        {tabs.map(({ label, icon: Icon }) => (
          <li
            key={label}
            className={`flex items-center gap-2 px-4
              border-r border-gray-200 last:border-r-0
              cursor-pointer
              ${
                activeTab === label
                  ? 'border-b-3 border-b-boost-blue text-boost-blue'
                  : 'border-b-3 border-b-transparent subtitle2-regular text-gray-600 hover:text-gray-700'
              }
            `}
            onClick={() => setActiveTab(label)}
          >
            <Icon className="w-4 h-4" />
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
}
