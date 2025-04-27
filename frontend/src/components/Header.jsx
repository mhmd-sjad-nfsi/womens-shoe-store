import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none', fontSize: 24 }}
          >
            فروشگاه کفش
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
