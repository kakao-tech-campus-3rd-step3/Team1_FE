import { SettingsSectionCard } from './SettingsSectionCard';
import { Link } from 'react-router-dom';

export const LicenseCard = () => (
  <SettingsSectionCard
    title="라이선스"
    desc="  본 서비스는 다음 오픈소스 라이선스를 포함합니다
       "
  >
    <small>
      Avatars by Stefanie – Licensed under
      <Link className="text-blue-400" to={'https://creativecommons.org/licenses/by/4.0/'}>
        CC BY 4.0
      </Link>
    </small>
  </SettingsSectionCard>
);
