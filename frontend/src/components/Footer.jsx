import { Box, Typography, Container } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 2,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} فروشگاه کفش زنانه | تمامی حقوق محفوظ است.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
