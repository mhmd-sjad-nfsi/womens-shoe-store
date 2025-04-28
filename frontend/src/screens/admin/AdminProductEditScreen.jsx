import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';

export default function AdminProductEditScreen() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const [name, setName]           = useState('');
  const [price, setPrice]         = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage]         = useState('');
  const [brand, setBrand]         = useState('');
  const [category, setCategory]   = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [ setSuccess]     = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get(`/api/products/${productId}`, config);
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    if (userInfo && userInfo.isAdmin) fetchProduct();
    else navigate('/login');
  }, [productId, userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(
        `/api/products/${productId}`,
        { name, price, description, image, brand, category, countInStock },
        config
      );
      setSuccess(true);
      setLoading(false);
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          ویرایش محصول
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Box component="form" onSubmit={submitHandler}>
            <Stack spacing={2}>
              <TextField label="نام" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <TextField
                label="قیمت"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
              />
              <TextField
                label="دسته"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
              />
              <TextField
                label="برند"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                fullWidth
              />
              <TextField
                label="موجودی"
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                fullWidth
              />
              <TextField
                label="آدرس تصویر"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                fullWidth
              />
              <TextField
                label="توضیحات"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={3}
              />
            </Stack>
            <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
              ذخیره تغییرات
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
