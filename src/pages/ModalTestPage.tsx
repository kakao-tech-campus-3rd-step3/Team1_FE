import { Button } from '@/shared/components/shadcn/button';
import ProjectCreateModalContent from '@/features/project/components/ProjectCreateModalContent';
import ProjectJoinModalContent from '@/features/project/components/ProjectJoinModalContent';
import { useModal } from '@/shared/hooks/useModal';
import { useCreateProjectMutation } from '@/features/project/hooks/useCreateProjectMutation';
import toast from 'react-hot-toast';

const ModalTestPage = () => {
  const { showAlert, showConfirm, showCustom, resetModal } = useModal();
  const createProjectMutation = useCreateProjectMutation();

  return (
    <div className="h-screen flex gap-4 items-center justify-center">
      {/* Confirm 모달 */}
      <Button
        onClick={() =>
          showConfirm(
            { title: '확인 모달', description: '정말 이 작업을 진행하시겠습니까?' },
            async () => {
              console.log('확인 클릭');
              toast.success('작업이 성공적으로 진행되었어요!');
            },
            () => console.log('취소 클릭'),
          )
        }
      >
        confirm
      </Button>

      {/* Alert 모달 */}
      <Button
        onClick={() =>
          showAlert({ title: '알림 모달', description: '작업이 완료되었습니다.' }, () =>
            console.log('확인 클릭'),
          )
        }
      >
        alert
      </Button>

      {/* Custom 모달 */}
      <Button
        onClick={() =>
          showCustom({
            title: '커스텀 모달',
            description: '커스텀 내용 포함 가능',
            content: (
              <div className="p-4 bg-gray-100 rounded text-center">
                여기에 내가 만들고 싶은 내용을 content 컴포넌트로 만들어 추가합니다.
              </div>
            ),
            buttons: [{ text: '닫기', onClick: () => resetModal(), variant: 'primary' }],
          })
        }
      >
        custom
      </Button>

      {/* Select 모달 */}
      <Button
        onClick={() =>
          showCustom({
            title: '선택 모달',
            description: '두 가지 선택지 중 한 가지를 선택해보세요.',
            buttons: [
              {
                text: '왼쪽 선택지',
                onClick: () => {
                  console.log('왼쪽 선택지 클릭됨!');
                  toast.success('왼쪽 선택지 클릭됨!');
                },
              },
              {
                text: '오른쪽 선택지',
                onClick: () => {
                  console.log('오른쪽 선택지 클릭됨!');
                  toast.success('오른쪽 선택지 클릭됨!');
                },
              },
            ],
          })
        }
      >
        Select
      </Button>

      {/* Select 모달 + Custom 모달 */}
      <Button
        onClick={() =>
          showCustom({
            title: '프로젝트가 존재하지 않아요!',
            description: '프로젝트에 참여하거나, 생성해보세요.',
            buttons: [
              {
                text: '프로젝트 생성',
                onClick: () =>
                  showCustom({
                    title: '프로젝트 생성하기',
                    description: '프로젝트 이름을 입력하면, 새로운 프로젝트를 생성할 수 있어요.',
                    content: (
                      <ProjectCreateModalContent
                        onConfirm={async (projectName) => {
                          await createProjectMutation.mutateAsync(projectName);
                          toast.success('프로젝트가 성공적으로 생성되었습니다!');
                        }}
                      />
                    ),
                  }),
              },
              {
                text: '프로젝트 참여',
                onClick: () =>
                  showCustom({
                    title: '프로젝트 참여하기',
                    description: '프로젝트 참여 코드를 입력하면, 프로젝트에 참여할 수 있어요.',
                    content: (
                      <ProjectJoinModalContent
                        onConfirm={async () => {
                          toast.success('프로젝트에 참여했어요!');
                        }}
                      />
                    ),
                  }),
              },
            ],
          })
        }
      >
        프로젝트 없을 때
      </Button>
    </div>
  );
};

export default ModalTestPage;
