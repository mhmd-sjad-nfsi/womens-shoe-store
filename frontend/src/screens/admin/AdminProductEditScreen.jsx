import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Stack,
  Box,
  InputLabel,
} from "@mui/material";

export default function AdminProductEditScreen() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);

  const [name, setName]         = useState("");
  const [price, setPrice]       = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");   // ← نگهداری URL تصویر
  const [brand, setBrand]       = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes]       = useState([]);   // [36,37,...]
  const [stock, setStock]       = useState([]);   // [{size, count},...]

  const [uploading, setUploading] = useState(false); // ← وضعیت آپلود

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
      return;
    }
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`/api/products/${productId}`, config);
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
        setImageUrl(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setSizes(data.sizes);
        setStock(data.stock);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, userInfo, navigate]);

  // ✨ تابع آپلود فایل
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploading(true);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImageUrl(data.url);
    } catch (err) {
      console.error(err);
      setError("آپلود تصویر انجام نشد");
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(
        `/api/products/${productId}`,
        {
          name,
          price,
          description,
          image: imageUrl,   // ← استفاده از URL آپلود شده
          brand,
          category,
          sizes,
          stock,
          colors: [],
        },
        config
      );
      setSuccess(true);
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSize = () => {
    const newSize = Number(prompt("سایز جدید را وارد کنید:"));
    if (newSize && !sizes.includes(newSize)) {
      setSizes([...sizes, newSize].sort((a, b) => a - b));
      setStock([...stock, { size: newSize, count: 0 }]);
    }
  };

  const handleStockChange = (idx, newCount) => {
    const updated = [...stock];
    updated[idx].count = Number(newCount);
    setStock(updated);
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
              {success && (
                <Alert severity="success">
                  محصول با موفقیت بروزرسانی شد
                </Alert>
              )}
              <TextField
                label="نام"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
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
                label="آدرس تصویر"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                fullWidth
              />

              {/* ورودی فایل آپلود */}
              <InputLabel>بارگذاری تصویر</InputLabel>
              <input
                type="file"
                accept="image/*"
                onChange={uploadFileHandler}
              />
              {uploading && <CircularProgress size={24} />}

              <TextField
                label="توضیحات"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={3}
              />

              {/* مدیریت سایزها و موجودی‌ها */}
              <Box>
                <Typography variant="subtitle1">
                  سایزها و موجودی:
                </Typography>
                {sizes.map((sz, idx) => (
                  <Box
                    key={sz}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <Typography sx={{ width: 60 }}>{sz}</Typography>
                    <TextField
                      type="number"
                      value={stock[idx]?.count || 0}
                      onChange={(e) =>
                        handleStockChange(idx, e.target.value)
                      }
                      sx={{ width: 100, mr: 2 }}
                      inputProps={{ min: 0 }}
                    />
                  </Box>
                ))}
                <Button variant="outlined" onClick={handleAddSize}>
                  افزودن سایز جدید
                </Button>
              </Box>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
            >
              ذخیره تغییرات
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
