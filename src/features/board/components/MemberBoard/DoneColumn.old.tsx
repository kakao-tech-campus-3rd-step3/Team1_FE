import { motion } from 'framer-motion';
import { useState } from 'react';
import type { TaskListItem } from '@/features/task/types/taskTypes';
import TaskCard from '@/features/task/components/TaskCard/TaskCard';
import doneIcon from '@/shared/assets/images/done.png';
import { Avatar, AvatarImage } from '@/shared/components/shadcn/avatar';
import { Separator } from '@/shared/components/shadcn/separator';
import { cn } from '@/shared/lib/utils';

interface DoneColumnProps {
  tasks: TaskListItem[];
}

const DoneColumn = ({ tasks }: DoneColumnProps) => {
  const [isColumnHover, setIsColumnHover] = useState(false);

  return (
    <div
      className="flex flex-col bg-gray-200 m-1 shadow-md rounded-xl border-2 border-gray-300 w-[330px] overflow-hidden"
      onMouseEnter={() => setIsColumnHover(true)}
      onMouseLeave={() => setIsColumnHover(false)}
    >
      <motion.div
        className="flex items-center gap-3 justify-between p-3 rounded-t-xl sticky top-0 bg-gray-200 z-10"
        animate={{
          flexDirection: isColumnHover ? 'row' : 'column',
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <motion.div
          className={cn('flex items-center mt-5', { 'm1-3': isColumnHover })}
          animate={{
            marginTop: isColumnHover ? '0px' : '20px',
            scale: isColumnHover ? 0.8 : 1,
          }}
          transition={{
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <Avatar
            className={cn(
              'flex items-center justify-center',
              isColumnHover ? 'w-23 h-23' : 'w-27 h-27',
            )}
          >
            <AvatarImage src={doneIcon} className={cn(isColumnHover ? 'w-20 h-20' : 'w-22 h-22')} />
          </Avatar>
        </motion.div>

        <motion.div
          className={cn(
            'flex flex-col',
            isColumnHover ? 'gap-1 items-start' : 'gap-4 items-center',
          )}
          animate={{
            x: isColumnHover ? -20 : 0,
            y: isColumnHover ? -4 : 0,
          }}
          transition={{
            duration: 0,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div
            className={cn('items-center title1-bold mt-2 text-gray-600', {
              'mr-18': isColumnHover,
            })}
          >
            진행 완료
          </div>
        </motion.div>
      </motion.div>

      <Separator
        className={cn(isColumnHover ? 'my-2 bg-gray-300' : 'bg-gray-400 !w-3/5 mx-auto my-7')}
      />

      <div className="relative flex flex-col p-2 gap-4 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.taskId} task={task} draggable={false} />
        ))}
      </div>
    </div>
  );
};

export default DoneColumn;
