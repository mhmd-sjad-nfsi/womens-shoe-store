// frontend/src/screens/admin/AdminProductsScreen.jsx

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
  Box,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import Paginate from '../../components/Paginate';

export default function AdminProductsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { userInfo } = useSelector((state) => state.user);

  const [products, setProducts] = useState([]);
  const [page, setPage]         = useState(1);
  const [pages, setPages]       = useState(1);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
      return;
    }
    const params = new URLSearchParams(location.search);
    const pageNumber = Number(params.get('pageNumber')) || 1;
    fetchProducts(pageNumber);
  }, [userInfo, navigate, location.search]);

  const fetchProducts = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/products?pageNumber=${pageNumber}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setProducts(data.products);
      setPage(data.page);
      setPages(data.pages);
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || err.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const createHandler = async () => {
    if (window.confirm('آیا می‌خواهید یک محصول جدید ایجاد کنید؟')) {
      try {
        setLoading(true);
        const { data } = await axios.post(
          '/api/products',
          { sizes: [], colors: [] },
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        enqueueSnackbar('محصول جدید ایجاد شد', { variant: 'success' });
        navigate(`/admin/product/${data._id}/edit`);
      } catch (err) {
        enqueueSnackbar(err.response?.data?.message || err.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('آیا مطمئن هستید؟')) {
      try {
        setLoading(true);
        await axios.delete(`/api/products/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        enqueueSnackbar('محصول حذف شد', { variant: 'success' });
        const params = new URLSearchParams(location.search);
        const pageNumber = Number(params.get('pageNumber')) || 1;
        fetchProducts(pageNumber);
      } catch (err) {
        enqueueSnackbar(err.response?.data?.message || err.message, { variant: 'error' });
      } finally {
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
      ) : (
        <>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>آیدی</TableCell>
                  <TableCell>نام</TableCell>
                  <TableCell>قیمت</TableCell>
                  <TableCell>دسته</TableCell>
                  <TableCell>برند</TableCell>
                  <TableCell>موجودی کل</TableCell>
                  <TableCell>عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((p) => {
                  const totalStock = p.stock.reduce((sum, s) => sum + s.count, 0);
                  return (
                    <TableRow key={p._id}>
                      <TableCell>{p._id}</TableCell>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.price.toFixed(2)}</TableCell>
                      <TableCell>{p.category}</TableCell>
                      <TableCell>{p.brand}</TableCell>
                      <TableCell>{totalStock}</TableCell>
                      <TableCell>
                        <IconButton
                          component={RouterLink}
                          to={`/admin/product/${p._id}/edit`}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => deleteHandler(p._id)} color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          <Paginate page={page} pages={pages} isAdmin />
        </>
      )}
    </Container>
  );
}
