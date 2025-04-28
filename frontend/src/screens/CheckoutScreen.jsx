import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, resetOrder } from '../redux/slices/orderSlice';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CheckoutScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cartItems);
  const { userInfo } = useSelector((state) => state.user);
  const { order, success, loading, error } = useSelector((state) => state.orderCreate);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/checkout');
    }
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(resetOrder());
    }
  }, [userInfo, success, navigate, order, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createOrder({
      orderItems: cart,
      shippingAddress: { address, city, postalCode, country },
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>نهایی‌سازی سفارش</Typography>
      <Grid container spacing={4}>
        {/* آدرس */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>آدرس ارسال</Typography>
            <form onSubmit={submitHandler}>
              <TextField
                label="آدرس"
                fullWidth required margin="normal"
                value={address} onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                label="شهر"
                fullWidth required margin="normal"
                value={city} onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                label="کد پستی"
                fullWidth required margin="normal"
                value={postalCode} onChange={(e) => setPostalCode(e.target.value)}
              />
              <TextField
                label="کشور"
                fullWidth required margin="normal"
                value={country} onChange={(e) => setCountry(e.target.value)}
              />
              <TextField
                label="روش پرداخت"
                fullWidth select margin="normal"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                SelectProps={{ native: true }}
              >
                <option value="PayPal">PayPal</option>
                <option value="Cash">پرداخت در محل</option>
              </TextField>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                  ثبت سفارش — {totalPrice.toFixed(2)} تومان
                </Button>
              )}
            </form>
          </Paper>
        </Grid>
        {/* خلاصه سفارش */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>خلاصه خرید</Typography>
            <Typography>آیتم‌ها: {itemsPrice.toFixed(2)} تومان</Typography>
            <Typography>هزینه ارسال: {shippingPrice.toFixed(2)} تومان</Typography>
            <Typography>مالیات: {taxPrice.toFixed(2)} تومان</Typography>
            <Typography fontWeight="bold">مجموع: {totalPrice.toFixed(2)} تومان</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
