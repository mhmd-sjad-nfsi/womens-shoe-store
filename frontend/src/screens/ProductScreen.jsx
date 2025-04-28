import { useState, useEffect } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container, Typography, Button, Grid, Box, Paper, Rating,
  Chip, Stack, FormControl, InputLabel, Select, MenuItem, Divider
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

export default function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [size, setSize]     = useState("");
  const [qty, setQty]       = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
      // پیش‌فرض اولین سایز موجود
      setSize(data.sizes[0] || "");
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>در حال بارگذاری...</div>;

  // موجودی برای سایز انتخاب‌شده
  const stockObj = product.stock.find((s) => s.size === size);
  const availableCount = stockObj ? stockObj.count : 0;

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, size, qty }));
    navigate("/cart");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Button component={RouterLink} to="/" sx={{ mb: 2 }}>
        ← بازگشت
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{ width: "100%", borderRadius: 2 }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold">{product.name}</Typography>
          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography>({product.numReviews})</Typography>
          </Stack>
          <Typography variant="h5" color="primary" gutterBottom>
            {product.price.toLocaleString()} تومان
          </Typography>
          <Typography paragraph color="text.secondary">
            {product.description}
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Stack direction="row" spacing={2} alignItems="center">
            {/* انتخاب سایز */}
            <FormControl size="small">
              <InputLabel>سایز</InputLabel>
              <Select
                value={size}
                label="سایز"
                onChange={(e) => { setSize(e.target.value); setQty(1); }}
              >
                {product.sizes.map((sz) => (
                  <MenuItem key={sz} value={sz}>{sz}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* انتخاب تعداد بر اساس موجودی سایز */}
            <FormControl size="small" disabled={availableCount === 0}>
              <InputLabel>تعداد</InputLabel>
              <Select
                value={qty}
                label="تعداد"
                onChange={(e) => setQty(e.target.value)}
              >
                {[...Array(availableCount).keys()].map((x) => (
                  <MenuItem key={x+1} value={x+1}>{x+1}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* وضعیت موجودی */}
            <Chip
              label={availableCount > 0 ? `موجود: ${availableCount}` : "ناموجود"}
              color={availableCount > 0 ? "success" : "error"}
            />
          </Stack>

          <Button
            variant="contained"
            fullWidth
            disabled={availableCount === 0}
            sx={{ mt: 2 }}
            onClick={addToCartHandler}
          >
            افزودن به سبد خرید
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
