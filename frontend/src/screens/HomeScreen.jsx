import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, CircularProgress, Alert } from '@mui/material';
import ProductCard from '../components/ProductCard.jsx';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      {loading ? (
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {products.map((prod) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={prod._id}>
              <ProductCard product={prod} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
