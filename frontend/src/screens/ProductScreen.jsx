import { useState, useEffect } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import { Alert, TextField } from "@mui/material";

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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

export default function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const { userInfo } = useSelector((state) => state.user);

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

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
  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(
        `/api/products/${id}/reviews`,
        { rating, comment },
        config
      );
      // بعد از موفقیت، رفرش نقدها
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
      setRating(0);
      setComment("");
      setReviewError("");
    } catch (err) {
      setReviewError(err.response?.data?.message || err.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        size,
        qty,
      })
    );
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
                objectFit: "contain",
                backgroundColor: "#f5f5f5",
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
              {/* نمایش نظرات */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6">
                  نظرات ({product.numReviews})
                </Typography>
                {product.reviews.length === 0 && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    هنوز نظری ثبت نشده
                  </Alert>
                )}
                {product.reviews.map((r) => (
                  <Box
                    key={r._id}
                    sx={{
                      my: 2,
                      p: 2,
                      border: "1px solid #ddd",
                      borderRadius: 2,
                    }}
                  >
                    <Typography fontWeight="bold">{r.name}</Typography>
                    <Rating value={r.rating} readOnly size="small" />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>{r.comment}</Typography>
                  </Box>
                ))}
              </Box>

              {/* فرم ثبت نظر */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6">ثبت نظر شما</Typography>
                {reviewError && <Alert severity="error">{reviewError}</Alert>}
                {userInfo ? (
                  <Box
                    component="form"
                    onSubmit={submitReviewHandler}
                    sx={{ mt: 2 }}
                  >
                    <Rating
                      value={rating}
                      onChange={(e, newValue) => setRating(newValue)}
                      required
                    />
                    <TextField
                      label="نظر شما"
                      multiline
                      fullWidth
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      sx={{ mt: 2 }}
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                      ثبت نظر
                    </Button>
                  </Box>
                ) : (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    لطفاً{" "}
                    <Link to={`/login?redirect=/product/${id}`}>وارد شوید</Link>{" "}
                    تا بتوانید نظر ثبت کنید.
                  </Alert>
                )}
              </Box>

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
                    availableCount > 0 ? `موجود: ${availableCount}` : "ناموجود"
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
