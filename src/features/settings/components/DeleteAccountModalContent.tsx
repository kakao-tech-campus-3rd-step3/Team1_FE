import { useDeleteAccountMutation } from '@/features/settings/hooks/useDeleteAccountMutation';
import cryingBoo from '@/shared/assets/images/boost/boo-crying.png';
import { Button } from '@/shared/components/shadcn/button';
import { useModal } from '@/shared/hooks/useModal';
import { motion } from 'framer-motion';

const DeleteAccountModalContent = () => {
  const { resetModal } = useModal();
  const { mutate: deleteAccount } = useDeleteAccountMutation();
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.img
        src={cryingBoo}
        alt="Boo"
        className="w-28 h-28 m-4"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className=" space-y-2">
        <h2 className="title1-bold text-boost-blue">정말 떠나시겠어요? </h2>
        <p className="label2-regular text-muted-foreground">
          부스트와 함께한 기록이 모두 사라져요.
          <br />
          정말로 계속 진행하시겠어요?
        </p>
        <div className="flex gap-2 mt-2 w-full">
          <Button
            variant="outline"
            onClick={() => {
              deleteAccount();
              resetModal();
            }}
            className="flex-1 border-gray-300 hover:bg-gray-200 cursor-pointer"
          >
            떠나기
          </Button>
          <Button variant="defaultBoost" onClick={resetModal} className="flex-1">
            함께하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModalContent;
