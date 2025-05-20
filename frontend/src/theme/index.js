// frontend/src/theme/index.js
import { createTheme } from '@mui/material/styles';

const baseSettings = {
  direction: 'rtl',
  typography: {
    fontFamily: 'Vazirmatn, sans-serif',
    h1: { 
      fontWeight: 900,
      letterSpacing: '-1.5px',
      '@media (max-width:600px)': { fontSize: '2.5rem' } // ریسپانسیو
    },
    button: { fontWeight: 700 }
  },
  shape: { borderRadius: 10 },
  shadows: Array(25).fill('0 3px 10px rgba(10, 47, 42, 0.1)')
};

export function createAppTheme(mode) {
  const isLight = mode === 'light';
  
  return createTheme({
    ...baseSettings,
    palette: {
      mode,
      primary: { main: '#0A2F2A' },
      secondary: { main: '#D4AF37' },
      background: {
        default: isLight ? '#F5F5F5' : '#051E1A', // سبز تیره‌تر برای کنتراست بهتر
        paper: isLight ? '#FFFFFF' : '#08332D'
      },
      text: {
        primary: isLight ? '#0A2F2A' : '#EEDC9A', // طلایی روشن‌تر برای خوانایی
        secondary: isLight ? '#5D4037' : '#D4AF37CC' // طلایی با شفافیت
      }
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#051E1A' : '#0A2F2A', // تطابق با تم
            color: '#D4AF37',
            boxShadow: 'none',
            borderBottom: `2px solid ${mode === 'dark' ? '#D4AF3755' : '#0A2F2A20'}`
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            border: '2px solid',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: isLight 
                ? '0 4px 12px rgba(10, 47, 42, 0.2)' 
                : '0 4px 12px rgba(212, 175, 55, 0.3)' // سایه طلایی در تاریکی
            }
          },
          containedPrimary: { 
            color: '#D4AF37',
            backgroundColor: mode === 'dark' ? '#0A2F2A' : '#0A2F2A', // ثابت نگه داشتن رنگ
            '&:hover': { backgroundColor: mode === 'dark' ? '#08332D' : '#0B372F' }
          },
          containedSecondary: { 
            color: mode === 'dark' ? '#051E1A' : '#0A2F2A', // متن تیره در تاریکی
            backgroundColor: '#D4AF37',
            '&:hover': { backgroundColor: '#E5C158' }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: '1px solid',
            borderColor: mode === 'dark' ? '#D4AF37AA' : '#D4AF3755', // حاشیه پررنگ‌تر در تاریکی
            backdropFilter: 'blur(8px)',
            backgroundColor: mode === 'dark' ? '#08332DCC' : '#FFFFFFCC' // شفافیت تطبیقی
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '& label.Mui-focused': { color: '#D4AF37' },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': { borderColor: '#D4AF37' }
            }
          }
        }
      }
    }
  });
}