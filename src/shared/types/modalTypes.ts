import type { ReactNode } from 'react';

export type ModalButton = {
  text: string;
  onClick: () => void | Promise<void>;
  variant?: 'default' | 'outline' | 'primary' | 'destructive';
  disabled?: boolean;
  styleClass?: string;
};

export type ModalPayload = {
  type: 'confirm' | 'alert' | 'custom' | 'select';
  size?: 'sm' | 'md' | 'lg';
  title: string;
  description?: string;
  content?: ReactNode;
  buttons?: ModalButton[];
  isLoading?: boolean;
  titleAlign?: 'left' | 'center';
};

export const ModalSize: Record<string, string> = {
  sm: 'sm:max-w-[300px]',
  md: 'sm:max-w-[500px]',
  lg: 'sm:max-w-[700px]',
};
