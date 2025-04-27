import { AppBar, Toolbar, Typography, Container, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const { cartItems } = useSelector(state => state.cart);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography
            component={RouterLink}
            to="/"
            sx={{ flexGrow:1, color:'inherit', textDecoration:'none', fontSize:24 }}
          >
            فروشگاه کفش
          </Typography>
          <IconButton component={RouterLink} to="/cart" color="inherit">
            <Badge badgeContent={totalQty} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
