import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';
import { Box, Typography, Grid, Paper, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function CartScreen() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const removeHandler = (id, size) => {
    dispatch(removeFromCart({ id, size }));
  };

  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>سبد خرید</Typography>
      <Grid container spacing={2}>
        {cartItems.length === 0 && <Typography>سبد خرید خالی است</Typography>}
        {cartItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={`${item._id}-${item.size}`}>
            <Paper sx={{ p: 2 }}>
              <Stack spacing={1}>
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{ width: '100%', borderRadius: 1 }}
                />
                <Typography>{item.name}</Typography>
                <Typography>سایز: {item.size}</Typography>
                <Typography>تعداد: {item.qty}</Typography>
                <Typography>
                  قیمت واحد: {item.price.toLocaleString()} تومان
                </Typography>
                <Typography>
                  مجموع: {(item.price * item.qty).toLocaleString()} تومان
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeHandler(item._id, item.size)}
                >
                  حذف
                </Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {cartItems.length > 0 && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6">جمع کل: {total} تومان</Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/checkout"
            sx={{ mt: 2 }}
          >
            ادامه به پرداخت
          </Button>
        </Box>
      )}
    </Box>
  );
}
