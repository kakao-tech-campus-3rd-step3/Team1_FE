export const PERSONA = {
  BOO: 'BOO',
} as const;
export type PersonaType = (typeof PERSONA)[keyof typeof PERSONA] | null;
