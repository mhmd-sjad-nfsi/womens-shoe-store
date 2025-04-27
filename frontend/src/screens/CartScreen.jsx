import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addToCart } from '../redux/slices/cartSlice';
import {
  Container, Typography, Grid, Paper, Box,
  IconButton, Button, Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link as RouterLink } from 'react-router-dom';

function CartScreen() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  const removeHandler = id => {
    dispatch(removeFromCart(id));
  };

  const changeQty = (item, newQty) => {
    if (newQty < 1 || newQty > item.countInStock) return;
    dispatch(addToCart({ ...item, qty: newQty }));
  };

  const subTotal = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>سبد خرید</Typography>
      {cartItems.length === 0 ? (
        <Typography>سبد خرید شما خالی است.</Typography>
      ) : (
        <Grid container spacing={2}>
          {cartItems.map(item => (
            <Grid item xs={12} key={item._id}>
              <Paper sx={{ p:2, display:'flex', alignItems:'center', gap:2 }}>
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{ width:80, height:80, objectFit:'cover', borderRadius:1 }}
                />
                <Stack sx={{ flex:1 }} spacing={1}>
                  <Typography noWrap>{item.name}</Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton size="small" onClick={() => changeQty(item, item.qty-1)}>
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography>{item.qty}</Typography>
                    <IconButton size="small" onClick={() => changeQty(item, item.qty+1)}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Typography>قیمت واحد: ${item.price}</Typography>
                  <Typography>جمع: ${(item.price * item.qty).toFixed(2)}</Typography>
                </Stack>
                <IconButton color="error" onClick={() => removeHandler(item._id)}>
                  <DeleteIcon />
                </IconButton>
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Paper sx={{ p:2, textAlign:'right' }}>
              <Typography variant="h6">
                مبلغ کل: ${subTotal}
              </Typography>
              <Button
                component={RouterLink}
                to="/"
                variant="contained"
                sx={{ mt:2 }}
              >
                ادامه خرید
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default CartScreen;
