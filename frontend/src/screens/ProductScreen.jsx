import { useState, useEffect } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container, Typography, Button, Grid, Box, Paper, Rating,
  Chip, Stack, FormControl, InputLabel, Select, MenuItem, Divider,
  Card, CardContent, CardMedia
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

export default function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [size, setSize]       = useState("");
  const [qty, setQty]         = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
      setSize(data.sizes[0] || "");
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <Typography>در حال بارگذاری...</Typography>;
  }

  const stockObj = product.stock.find((s) => s.size === size);
  const availableCount = stockObj ? stockObj.count : 0;

  const addToCartHandler = () => {
    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      size,
      qty,
    }));
    navigate("/cart");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Button component={RouterLink} to="/" sx={{ mb: 3 }} color="secondary">
        ← بازگشت
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={4} sx={{ borderRadius: 4 }}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{
                height: 400,
                objectFit: 'contain',
                backgroundColor: '#f5f5f5',
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ p: 3, borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {product.name}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Rating value={product.rating} precision={0.5} readOnly />
                <Typography variant="body2">({product.numReviews})</Typography>
              </Stack>
              <Typography variant="h5" color="primary" gutterBottom>
                {product.price.toLocaleString()} تومان
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {product.description}
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <FormControl size="small">
                  <InputLabel>سایز</InputLabel>
                  <Select
                    value={size}
                    label="سایز"
                    onChange={(e) => {
                      setSize(e.target.value);
                      setQty(1);
                    }}
                  >
                    {product.sizes.map((sz) => (
                      <MenuItem key={sz} value={sz}>
                        {sz}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl size="small" disabled={availableCount === 0}>
                  <InputLabel>تعداد</InputLabel>
                  <Select
                    value={qty}
                    label="تعداد"
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(availableCount).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Chip
                  label={
                    availableCount > 0
                      ? `موجود: ${availableCount}`
                      : "ناموجود"
                  }
                  color={availableCount > 0 ? "success" : "error"}
                />
              </Stack>

              <Button
                variant="contained"
                size="large"
                fullWidth
                disabled={availableCount === 0}
                onClick={addToCartHandler}
                sx={{ mt: 1, borderRadius: 3, py: 1.5 }}
              >
                افزودن به سبد خرید
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
