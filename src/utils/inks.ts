export const INKS_TRANSLATE = {
  blue: "azul",
  black: "preto",
  red: "vermelho",
  yellow: "amarelo",
} as const;

export type InkColors = keyof typeof INKS_TRANSLATE;
