import { useState } from 'react';
import { Switch } from '@/shared/components/shadcn/switch';
import { SettingsSectionCard } from '@/features/settings/components/SettingsSectionCard';
import { Card } from '@/shared/components/shadcn/card';
import { cn } from '@/shared/lib/utils';
import { useProjectsQuery } from '@/features/project/hooks/useProjectsQuery';
import { useUpdateNotificationSettingsMutation } from '@/features/settings/hooks/useUpdateNotificationSettingsMutation';
import { useUpdateProjectNotificationSettingsMutation } from '@/features/settings/hooks/useUpdateProjectNotificationSettingsMutation';

const AlarmSettingCard = () => {
  const [isServiceAlarmOn, setIsServiceAlarmOn] = useState(true);
  const [projectAlarms, setProjectAlarms] = useState<Record<string, boolean>>({});

  const { data: projectsData } = useProjectsQuery();

  const resetProjectAlarms = () => setProjectAlarms({});

  const { mutate: updateServiceAlarm } = useUpdateNotificationSettingsMutation(
    setIsServiceAlarmOn,
    resetProjectAlarms,
  );

  const { mutate: updateProjectAlarm } =
    useUpdateProjectNotificationSettingsMutation(setProjectAlarms);

  const handleProjectToggle = (projectId: string, value: boolean) => {
    updateProjectAlarm({ projectId, enabled: value });
  };

  const handleServiceToggle = (value: boolean) => {
    updateServiceAlarm(value);
  };

  return (
    <SettingsSectionCard
      title="알림 설정"
      desc="서비스 알림과 프로젝트별 알림을 관리할 수 있습니다 🔔"
    >
      <div className="flex flex-col gap-6">
        {/* 서비스 알림 섹션 */}
        <Card className="p-4 bg-gray-50 border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-900">서비스 알림</span>
              <span className="text-xs text-gray-500">모든 프로젝트 알림을 한번에 제어합니다</span>
            </div>
            <Switch checked={isServiceAlarmOn} onCheckedChange={handleServiceToggle} />
          </div>
        </Card>

        {/* 프로젝트별 알림 섹션 */}
        <div
          className={cn(
            'flex flex-col gap-3 pl-4 transition-opacity duration-300',
            !isServiceAlarmOn && 'opacity-60 pointer-events-none',
          )}
        >
          <p className="font-medium text-gray-800">프로젝트별 알림</p>

          <div className="border border-gray-100 rounded-md divide-y divide-gray-100">
            {projectsData?.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between py-2 px-3 bg-white"
              >
                <span className="text-sm text-gray-900">{project.name}</span>
                <Switch
                  checked={projectAlarms[project.id] ?? false}
                  onCheckedChange={(val) => handleProjectToggle(project.id, val)}
                  disabled={!isServiceAlarmOn}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SettingsSectionCard>
  );
};

export default AlarmSettingCard;
