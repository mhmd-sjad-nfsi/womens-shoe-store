import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  Stack,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

function ProductScreen() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty,
      })
    );
    navigate("/cart");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error)
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Button component={RouterLink} to="/" sx={{ mb: 2 }}>
        ← بازگشت
      </Button>
      <Box
        component="img"
        src={product.image}
        alt={product.name}
        sx={{
          width: "100%",
          maxHeight: 400,
          objectFit: "cover",
          borderRadius: 2,
          mb: 2,
        }}
      />
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center" mb={2}>
        <Rating value={product.rating} precision={0.5} readOnly />
        <Typography>({product.numReviews} نظر)</Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1" paragraph>
        {product.description}
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
      >
        <FormControl size="small">
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
        <Chip
          label={product.countInStock > 0 ? "موجود" : "ناموجود"}
          color={product.countInStock > 0 ? "success" : "error"}
        />
      </Stack>
      <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
        ${product.price}
      </Typography>
      <Button
        onClick={addToCartHandler}
        variant="contained"
        disabled={product.countInStock === 0}
        sx={{ mt: 2 }}
      >
        افزودن به سبد خرید
      </Button>
    </Container>
  );
}

export default ProductScreen;
