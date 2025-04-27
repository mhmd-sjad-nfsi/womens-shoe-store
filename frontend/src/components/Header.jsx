import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
            فروشگاه کفش زنانه
          </Typography>

          <Box>
            <Button
              color="inherit"
              component={RouterLink}
              to="/cart"
              sx={{ fontWeight: "bold" }}
            >
              سبد خرید
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
