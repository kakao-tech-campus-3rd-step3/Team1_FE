import useModalStore from '@/shared/store/useModalStore';
import type { ModalPayload, ModalButton } from '@/shared/types/modalTypes';

type ButtonAction = () => void | Promise<void>;
interface CommonModalProps {
  title: string;
  description?: string;
}

export const useModal = () => {
  const { openModal, closeModal, backModal } = useModalStore();

  const wrapButton = (btn: ModalButton): ModalButton => ({
    ...btn,
    onClick: async () => {
      try {
        await btn.onClick();
        closeModal();
      } catch (err) {
        console.error('Modal action failed:', err);
      }
    },
  });

  const showAlert = ({ title, description }: CommonModalProps, onConfirm?: ButtonAction) => {
    openModal({
      type: 'alert',
      title,
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
      description,
      buttons: [
        {
          text: '취소',
          variant: 'outline',
          onClick: async () => {
            await onCancel?.();
            closeModal();
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
    openModal({ ...payload, type: 'custom' });
  };

  const showSelect = (payload: Omit<ModalPayload, 'type'>) => {
    openModal({
      ...payload,
      type: 'select',
      buttons: payload.buttons?.map(wrapButton),
    });
  };

  return { showAlert, showConfirm, showCustom, showSelect, closeModal, backModal };
};
