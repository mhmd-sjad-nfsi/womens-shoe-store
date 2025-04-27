import { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Paper,
  Rating,
  Chip,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";

function ProductScreen() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("خطا در دریافت محصول:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          محصول پیدا نشد!
        </Typography>
        <Button component={RouterLink} to="/" sx={{ mt: 2 }}>
          بازگشت به صفحه اصلی
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Button component={RouterLink} to="/" sx={{ mb: 3 }}>
        ← بازگشت
      </Button>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
        <Grid container spacing={4}>
          {/* عکس محصول */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{ width: "100%", borderRadius: 3, objectFit: "cover" }}
            />
          </Grid>

          {/* جزئیات محصول */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {product.name}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.numReviews} نظر)
              </Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" paragraph color="text.secondary">
              {product.description}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2} my={2}>
              <Chip
                label={product.countInStock > 0 ? "موجود" : "ناموجود"}
                color={product.countInStock > 0 ? "success" : "error"}
              />

              {product.countInStock > 0 && (
                <FormControl size="small" sx={{ minWidth: 100 }}>
                  <InputLabel>تعداد</InputLabel>
                  <Select
                    value={qty}
                    label="تعداد"
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Stack>

            <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
              {product.price.toLocaleString()} تومان
            </Typography>

            <Button
              variant="contained"
              fullWidth
              disabled={product.countInStock === 0}
              size="large"
              sx={{ mt: 2, py: 1.5 }}
            >
              افزودن به سبد خرید
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ProductScreen;
