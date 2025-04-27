// frontend/src/theme/index.js
import { createTheme } from '@mui/material/styles';

// تعریف پالت رنگ Material You ساده (می‌توانی رنگ‌ها را تغییر دهی)
const lightPalette = {
  mode: 'light',
  primary: {
    main: '#6750A4',
  },
  secondary: {
    main: '#625B71',
  },
  background: {
    default: '#fdfdfd',
    paper: '#ffffff',
  },
};

const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#D0BCFF',
  },
  secondary: {
    main: '#CCC2DC',
  },
  background: {
    default: '#1C1B1F',
    paper: '#2B2930',
  },
};

const baseThemeOptions = {
                   // فعال کردن راست‌چین
  direction: "rtl", // خیلی مهم برای راست به چپ بودن کل سایت
  typography: {
    fontFamily: "Vazirmatn, sans-serif",
  },
  shape: {
    borderRadius: 12,                 // گوشه‌های گرد
  },
};

const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: lightPalette,
});

const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: darkPalette,
});

export { lightTheme, darkTheme };
export default lightTheme;
