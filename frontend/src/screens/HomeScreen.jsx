import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  CircularProgress,
  Alert,
  TextField,
  Box,
  Chip,
  Typography,
  Skeleton,
} from "@mui/material";
import ProductCard from "../components/ProductCard.jsx";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("همه");

  const categories = ["همه", "اسپرت", "دویدن", "مجلسی", "چکمه", "صندل", "روزمره", "پیاده‌روی", "رسمی", "طبیعت‌گردی", "ورزشی"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/products");
        setProducts(data);
        setFiltered(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // فیلتر بر اساس جستجو و دسته‌بندی
  useEffect(() => {
    let temp = products;

    if (categoryFilter !== "همه") {
      temp = temp.filter((p) => p.category === categoryFilter);
    }

    if (searchTerm) {
      const term = searchTerm.trim().toLowerCase();
      temp = temp.filter((p) => p.name.toLowerCase().includes(term));
    }

    setFiltered(temp);
  }, [searchTerm, categoryFilter, products]);

  return (
    <Container sx={{ mt: 4 }}>
      {/* نوار جستجو و فیلتر دسته‌بندی */}
      <Box mb={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="جستجوی محصول..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{ sx: { bgcolor: "background.paper" } }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: "left", md: "right" } }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                clickable
                color={categoryFilter === cat ? "primary" : "default"}
                onClick={() => setCategoryFilter(cat)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        // Skeleton Grid
        <Grid container spacing={3}>
          {[...Array(8)].map((_, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
              <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
              <Skeleton width="60%" sx={{ mt: 1 }} />
              <Skeleton width="40%" />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : filtered.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          محصولی یافت نشد
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filtered.map((prod) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={prod._id}>
              <ProductCard product={prod} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
