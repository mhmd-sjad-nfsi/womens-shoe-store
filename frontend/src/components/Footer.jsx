import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2, mt: 4, textAlign: 'center' }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} فروشگاه کفش زنانه
      </Typography>
    </Box>
  );
}

export default Footer;
