import useModalStore from '@/shared/store/useModalStore';
import type { ModalPayload, ModalButton } from '@/shared/types/modalTypes';

type ButtonAction = () => void | Promise<void>;
interface CommonModalProps {
  title: string;
  description?: string;
}

export const useModal = () => {
  const { openModal, resetModal, backModal } = useModalStore();

  const wrapButton = (btn: ModalButton): ModalButton => ({
    ...btn,
    onClick: async () => {
      try {
        await btn.onClick();
        resetModal();
      } catch (err) {
        console.error('Modal action failed:', err);
      }
    },
  });

  const showAlert = ({ title, description }: CommonModalProps, onConfirm?: ButtonAction) => {
    openModal({
      type: 'alert',
      title,
      size: 'sm',
      description,
      buttons: [
        wrapButton({
          text: '확인',
          onClick: async () => {
            await onConfirm?.();
          },
        }),
      ],
    });
  };

  const showConfirm = (
    { title, description }: CommonModalProps,
    onConfirm: ButtonAction,
    onCancel?: ButtonAction,
  ) => {
    openModal({
      type: 'confirm',
      title,
      size: 'sm',
      description,
      buttons: [
        {
          text: '취소',
          variant: 'outline',
          onClick: async () => {
            await onCancel?.();
            resetModal();
          },
        },
        wrapButton({
          text: '확인',
          onClick: onConfirm,
        }),
      ],
    });
  };

  const showCustom = (payload: Omit<ModalPayload, 'type' | 'id'>) => {
    openModal({ ...payload, type: 'custom', size: payload.size || 'md' });
  };

  const showSelect = (payload: Omit<ModalPayload, 'type'>) => {
    openModal({
      ...payload,
      type: 'select',
      size: payload.size || 'md',
      buttons: payload.buttons?.map(wrapButton),
    });
  };

  return { showAlert, showConfirm, showCustom, showSelect, resetModal, backModal };
};
