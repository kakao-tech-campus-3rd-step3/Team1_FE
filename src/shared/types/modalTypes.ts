import type { ReactNode } from 'react';

export type ModalButton = {
  text: string;
  onClick: () => void | Promise<void>;
  variant?: 'default' | 'outline' | 'primary' | 'destructive';
  disabled?: boolean;
};

export type ModalPayload = {
  type: 'confirm' | 'alert' | 'custom' | 'select';
  title: string;
  description?: string;
  content?: ReactNode;
  buttons?: ModalButton[];
  isLoading?: boolean;
};
