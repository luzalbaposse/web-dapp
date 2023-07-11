export const lightPrimary = "#7857ed";
export const darkPrimary = "#bbed55";
export const lightTextPrimary01 = "#1c2126";
export const darkTextPrimary01 = "#ffffff";
export const darkTextPrimary02 = "#CCCED1";
export const darkTextPrimary03 = "#aaadb3";
export const darkTextPrimary04 = "#71767b";
export const lightTextPrimary03 = "#536471";
export const lightTextPrimary04 = "#697f8f";
export const darkPositive = "#1DB954";
export const darkBg01 = "#131415";
export const black = "#000000";
export const white = "#ffffff";
export const lightSurfaceHover = "#EBEDF0";
export const darkSurfaceHover = "#2D2F32";
export const warning = "#FFD166";
export const danger = "#FF2222";
export const grayPrimary = "#9fa3a9";
export const lightBg01 = "#FAFAFB";
export const darkBlue = "#1e2330";

// FOR EASIER MIGRATION TO DESIGN SYSTEM (to be used with styled components)

const LIGHT_PRIMARY = "#7857ED";
const DARK_PRIMARY = "#BBED55";
export const PRIMARY_COLOR = theme => (theme != "dark" ? LIGHT_PRIMARY : DARK_PRIMARY);

const LIGHT_TEXT_PRIMARY_01 = "#1C2126";
const DARK_TEXT_PRIMARY_01 = "#FFFFFF";
export const TEXT_PRIMARY_01 = theme => (theme != "dark" ? LIGHT_TEXT_PRIMARY_01 : DARK_TEXT_PRIMARY_01);
export const TEXT_PRIMARY_01_INVERSE = theme => (theme == "dark" ? LIGHT_TEXT_PRIMARY_01 : DARK_TEXT_PRIMARY_01);

const LIGHT_TEXT_PRIMARY_03 = "#536471";
const DARK_TEXT_PRIMARY_03 = "#AAADB3";
export const TEXT_PRIMARY_03 = theme => (theme != "dark" ? LIGHT_TEXT_PRIMARY_03 : DARK_TEXT_PRIMARY_03);

const LIGHT_TEXT_PRIMARY_04 = "#697F8F";
const DARK_TEXT_PRIMARY_04 = "#71767B";
export const TEXT_PRIMARY_04 = theme => (theme != "dark" ? LIGHT_TEXT_PRIMARY_04 : DARK_TEXT_PRIMARY_04);

const LIGHT_SURFACE_HOVER_02 = "#DADDE1";
const DARK_SURFACE_HOVER_02 = "#3B3C3F";
export const SURFACE_HOVER_02 = theme => (theme != "dark" ? LIGHT_SURFACE_HOVER_02 : DARK_SURFACE_HOVER_02);
