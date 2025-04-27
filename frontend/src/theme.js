import { createTheme } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';

const theme = createTheme(
  {
    direction: 'rtl',
    palette: {
      mode: 'light',
      primary: {
        main: '#8e24aa', // رنگ اصلی (بنفش ملایم)
      },
      secondary: {
        main: '#f48fb1', // رنگ فرعی (صورتی ملایم)
      },
      background: {
        default: '#fafafa',
      },
    },
    typography: {
      fontFamily: 'IRANSans, Roboto, Arial',
    },
  },
  faIR, // زبان فارسی متریال یوآی
);

export default theme;
