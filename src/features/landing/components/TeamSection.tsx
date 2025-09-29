import { CardDescription, CardContent, CardTitle, Card } from '@/shared/components/shadcn/card';
import AvatarLJH from '@/shared/assets/images/ljh-avatar.png';
import AvatarKWH from '@/shared/assets/images/kwh-avatar.png';
import AvatarKHM from '@/shared/assets/images/khm-avatar.png';
import AvatarSYJ from '@/shared/assets/images/syj-avatar.png';
import AvatarYDY from '@/shared/assets/images/ydy-avatar.png';

const TeamSection = () => {
  const teamMembers = [
    { name: '이진호', role: 'Backend', img: AvatarLJH },
    { name: '김원호', role: 'Backend', img: AvatarKWH },
    { name: '김혜민', role: 'Frontend', img: AvatarKHM },
    { name: '서영진', role: 'Backend', img: AvatarSYJ },
    { name: '유다연', role: 'Frontend', img: AvatarYDY },
  ];

  return (
    <div className="py-35 bg-white">
      <div className="text-center mb-18">
        <h2 className="text-4xl font-bold text-gray-800">Boost Team</h2>
        <p className="mt-4 text-lg text-gray-500">
          프로젝트를 열심히 이끌어주고 있는 Boost 팀원들입니다!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4">
        {teamMembers.map((member, idx) => (
          <Card
            key={idx}
            className="border-gray-300 shadow-md rounded-xl items-center p-6 w-full h-full min-w-[250px] min-h-[300px] flex flex-col justify-center transform transition hover:-translate-y-2 hover:shadow-xl"
          >
            <img
              src={member.img}
              className={`w-30 ${member.role === 'Backend' ? 'bg-boost-blue' : 'bg-boost-orange'} rounded-full p-2.5`}
              alt={member.name}
            />

            <CardContent className="text-center space-y-3 mt-4 flex-1">
              <CardTitle className="text-xl font-bold text-gray-800">{member.name}</CardTitle>
              <CardDescription className="text-md text-gray-600">{member.role}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
