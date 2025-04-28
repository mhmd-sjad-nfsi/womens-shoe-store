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
  Button,
  IconButton,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';

export default function AdminProductsScreen() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.get('/api/products', config);
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchProducts();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const createHandler = async () => {
    if (window.confirm('آیا می‌خواهید یک محصول جدید ایجاد کنید؟')) {
      try {
        setLoading(true);
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.post('/api/products', {}, config);
        navigate(`/admin/product/${data._id}/edit`);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('آیا مطمئن هستید؟')) {
      try {
        setLoading(true);
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        await axios.delete(`/api/products/${id}`, config);
        fetchProducts();
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">مدیریت محصولات</Typography>
        <Button variant="contained" onClick={createHandler}>
          ایجاد محصول جدید
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>آیدی</TableCell>
                <TableCell>نام</TableCell>
                <TableCell>قیمت</TableCell>
                <TableCell>دسته</TableCell>
                <TableCell>برند</TableCell>
                <TableCell>موجودی</TableCell>
                <TableCell>عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p._id}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.price.toFixed(2)}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{p.brand}</TableCell>
                  <TableCell>{p.countInStock}</TableCell>
                  <TableCell>
                    <IconButton
                      component={RouterLink}
                      to={`/admin/product/${p._id}/edit`}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteHandler(p._id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
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
