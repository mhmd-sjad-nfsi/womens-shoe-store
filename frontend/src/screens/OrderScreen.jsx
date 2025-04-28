import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
  Box,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function OrderScreen() {
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.user);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(`/api/orders/${orderId}`, config);
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, userInfo]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!order) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        سفارش #{order._id}
      </Typography>

      <Grid container spacing={4}>
        {/* بخش آدرس ارسال */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">آدرس ارسال</Typography>
            <Typography>
              {order.shippingAddress.address}, {order.shippingAddress.city}،{" "}
              {order.shippingAddress.postalCode}، {order.shippingAddress.country}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              وضعیت پرداخت:{" "}
              {order.isPaid ? (
                <Typography component="span" color="success.main">
                  پرداخت شده در {new Date(order.paidAt).toLocaleString()}
                </Typography>
              ) : (
                <Typography component="span" color="error.main">
                  پرداخت نشده
                </Typography>
              )}
            </Typography>
          </Paper>
        </Grid>

        {/* بخش خلاصه خرید */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">خلاصه خرید</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="آیتم‌ها"
                  secondary={`${order.itemsPrice.toFixed(2)} تومان`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="هزینه ارسال"
                  secondary={`${order.shippingPrice.toFixed(2)} تومان`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="مالیات"
                  secondary={`${order.taxPrice.toFixed(2)} تومان`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="جمع کل"
                  secondary={
                    <Typography fontWeight="bold">
                      {order.totalPrice.toFixed(2)} تومان
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* لیست آیتم‌های سفارش */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          آیتم‌های سفارش
        </Typography>
        {order.orderItems.length === 0 ? (
          <Alert severity="info">هیچ آیتمی در سفارش وجود ندارد.</Alert>
        ) : (
          <Grid container spacing={2}>
            {order.orderItems.map((item) => (
              <Grid item xs={12} key={item.product}>
                <Paper sx={{ display: "flex", p: 2, alignItems: "center" }}>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 1,
                      mr: 2,
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      component={RouterLink}
                      to={`/product/${item.product}`}
                      sx={{ textDecoration: "none" }}
                    >
                      {item.name}
                    </Typography>
                    <Typography>
                      تعداد: {item.qty} × {item.price.toFixed(2)} تومان
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
