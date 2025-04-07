export const BLACK          = '#1D1B1A';
export const WHITE          = '#FFFFFF';
export const GREY_100       = '#F3F0EF';//#FBFAF8';
export const GREY_800       = '#232838';
export const PEACH_200      = '#FAEBDF';
export const PEACH_500      = '#F7D2B5';
export const CORAL          = '#FFAA8D';
export const GREEN          = '#8DFFAB';
export const BLUE           = '#A5FBFF'
export const MINT_200       = '#E9FDF8';
export const MINT_500       = '#B3F1E3';
export const MINT_800       = '#082D4A';//'#0C426C';//'#082D4A';
export const UMBER          = '#A24545'
export const SLATE          = '#006D8F';
export const YOLK           = '#FFC700';
export const ORANGE         = '#EE8465';//#FF3D02';
export const TRANSPARENT    = 'transparent';//#FF3D02';
//
export const WHITE_THEME        = {text: BLACK, bg: WHITE};
export const PEACH_THEME        = {text: BLACK, bg: PEACH_500};
export const SLATE_THEME        = {text: PEACH_200, bg: BLACK};
export const CORAL_THEME        = {text: BLACK, bg: CORAL};
export const GREEN_THEME        = {text: BLACK, bg: GREEN};
export const MINT_THEME         = {text: PEACH_200, bg: MINT_800};
export const BLUE_THEME         = {text: BLACK, bg: BLUE};
export const YOLK_THEME         = {text: BLACK, bg: YOLK};
export const UMBER_THEME        = {text: BLACK, bg: GREY_100};//{text: MINT_200, bg: UMBER};
export const BLACK_THEME        = {text: PEACH_200, bg: BLACK};
export const ORANGE_THEME       = {text: BLACK, bg: ORANGE};
export const TRANSPARENT_THEME  = {text: BLACK, bg: TRANSPARENT};
//
export const THEMES = [
  WHITE_THEME,
  PEACH_THEME,
  CORAL_THEME,
  GREEN_THEME,
  MINT_THEME,
  BLUE_THEME,
  YOLK_THEME,
  UMBER_THEME,
  BLACK_THEME,
  ORANGE_THEME,
  TRANSPARENT_THEME
];
//
export function randomTheme(){
  return THEMES[Math.floor(Math.random()*THEMES.length)];
}
