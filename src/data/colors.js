export const BLACK          = '#0A122A';
export const WHITE          = '#FFFFFF';
export const GREY_100       = '#FBFAF8';
export const GREY_800       = '#232838';
export const PEACH_200      = '#FAEBDF';
export const PEACH_500      = '#F7D2B5';
export const MINT_200       = '#E9FDF8';
export const MINT_500       = '#B3F1E3';
export const MINT_800       = '#082D4A';//'#0C426C';//'#082D4A';
export const UMBER          = '#A24545'
export const SLATE          = '#006D8F';
export const YOLK           = '#FFC700';
//
export const WHITE_THEME    = {text: BLACK, bg: GREY_100};
export const PEACH_THEME    = {text: BLACK, bg: PEACH_200};//{text: MINT_800, bg: PEACH_500};
export const SLATE_THEME    = {text: BLACK, bg: GREY_100};//{text: PEACH_500, bg: SLATE};
export const YOLK_THEME     = {text: BLACK, bg: YOLK};
export const UMBER_THEME    = {text: BLACK, bg: GREY_100};//{text: MINT_200, bg: UMBER};
export const BLACK_THEME    = {text: PEACH_200, bg: BLACK};
//
export const THEMES = [
  WHITE_THEME,
  PEACH_THEME,
  SLATE_THEME,
  YOLK_THEME,
  UMBER_THEME,
  BLACK_THEME,
];
//
export function randomTheme(){
  return THEMES[Math.floor(Math.random()*THEMES.length)];
}
