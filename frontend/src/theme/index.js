// frontend/src/theme/index.js

import { createTheme } from '@mui/material/styles';

// پالت رنگ برای حالت روشن با ترکیب مدرن و شگفت‌انگیز
const lightPalette = {
  mode: 'light',
  primary: { main: '#0D3B66' },       // آبی تیره مدرن
  secondary: { main: '#FAA916' },     // زرد پرانرژی
  error: { main: '#D7263D' },         // قرمز برجسته
  info: { main: '#118AB2' },          // آبی روشن
  success: { main: '#06D6A0' },       // سبز زنده
  background: { default: '#F5F7FA', paper: '#FFFFFF' },
  text: { primary: '#1B1B1E', secondary: '#5B5B5F' },
};

// پالت رنگ برای حالت تاریک با حس و حال مدرن
const darkPalette = {
  mode: 'dark',
  primary: { main: '#118AB2' },       // آبی خنک
  secondary: { main: '#06D6A0' },     // سبز نعنایی
  error: { main: '#FF6B6B' },         // قرمز ملایم
  info: { main: '#4EA8DE' },          // آبی روشن‌تر
  success: { main: '#A0E8AF' },       // سبز پاستلی
  background: { default: '#121212', paper: '#1E1E1E' },
  text: { primary: '#E0E0E0', secondary: '#A0A0A0' },
};

// تنظیمات مشترک
const baseOptions = {
  direction: 'rtl',
  typography: { fontFamily: 'Vazirmatn, sans-serif' },
  shape: { borderRadius: 12 },
};

// تابع ساخت تم بر اساس mode
export function createAppTheme(mode) {
  const palette = mode === 'light' ? lightPalette : darkPalette;
  return createTheme({
    ...baseOptions,
    palette,
  });
}
