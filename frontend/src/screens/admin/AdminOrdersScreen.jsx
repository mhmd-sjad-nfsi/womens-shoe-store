import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';

export default function AdminOrdersScreen() {
  const { userInfo } = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('/api/orders', config);
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        مدیریت سفارش‌ها
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>آیدی سفارش</TableCell>
                <TableCell>کاربر</TableCell>
                <TableCell>تاریخ</TableCell>
                <TableCell>قیمت کل</TableCell>
                <TableCell>پرداخت شده</TableCell>
                <TableCell>ارسال شده</TableCell>
                <TableCell>جزئیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    {order.isPaid
                      ? new Date(order.paidAt).toLocaleDateString()
                      : '×'}
                  </TableCell>
                  <TableCell>
                    {order.isDelivered
                      ? new Date(order.deliveredAt).toLocaleDateString()
                      : '×'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      href={`/order/${order._id}`}
                    >
                      جزئیات
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
