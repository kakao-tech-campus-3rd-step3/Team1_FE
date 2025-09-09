import { Button } from './shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './shadcn/dropdown-menu';
import { useSortStore } from '../stores/sortStore';
import { SortAscIcon, SortDescIcon } from 'lucide-react';
import { useState } from 'react';

function SortDropDown() {
  const { criteria, setCriteria, order, toggleOrder } = useSortStore();
  const [open, setOpen] = useState(false);

  const options: { label: string; value: 'created' | 'deadline' }[] = [
    { label: '생성일자순', value: 'created' },
    { label: '마감일자순', value: 'deadline' },
  ];

  const handleItemClick = (value: 'created' | 'deadline') => {
    if (criteria === value) {
      toggleOrder();
    } else {
      setCriteria(value);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-gray-300 focus:border-gray-300 focus:ring-transparent"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span>{criteria === 'created' ? '생성일자순' : '마감일자순'}</span>
          <span>{order === 'asc' ? <SortAscIcon size={16} /> : <SortDescIcon size={16} />}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-36 border-gray-300" sideOffset={3}>
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            className="flex items-center justify-between"
            onClick={(e) => {
              e.preventDefault();
              handleItemClick(opt.value);
            }}
          >
            <span>{opt.label}</span>
            {criteria === opt.value && (
              <span>
                {order === 'asc' ? <SortAscIcon size={16} /> : <SortDescIcon size={16} />}
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortDropDown;
