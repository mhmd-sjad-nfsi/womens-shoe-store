// src/components/ProductCard.jsx

import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  Fade,
  useTheme,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import Rating from "./Rating"; // ← اینجا کامپوننت سفارشی را ایمپورت می‌کنیم

export default function ProductCard({ product }) {
  const [hover, setHover] = useState(false);
  const theme = useTheme();

  // محاسبهٔ موجودی کل
  const totalStock = product.stock?.reduce((sum, s) => sum + s.count, 0) || 0;
  const lowStock = totalStock < 5;

  return (
    <Card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        position: "relative",
        borderRadius: 4,
        boxShadow: 2,
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
        display: "flex",
        flexDirection: "column",
        height: "100%",
        willChange: "transform",
      }}
    >
      {/* === بخش تصویر === */}
      <Box
        sx={{
          position: "relative",
          pt: "75%", // نسبت تصویر 4:3
          backgroundColor: theme.palette.grey[100],
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name || "تصویر محصول"}
          loading="lazy"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            ...(hover && {
              transform: "scale(1.05)",
              willChange: "transform",
            }),
          }}
        />

        {/* نمایش دسته به صورت Chip */}
        {product.category && (
          <Chip
            label={product.category}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "secondary.main",
              color: theme.palette.getContrastText(
                theme.palette.secondary.main
              ),
              px: 1,
              py: 0.5,
              fontWeight: "bold",
              backdropFilter: "blur(4px)",
              zIndex: 1,
            }}
          />
        )}

        {/* نشانگر کمبود موجودی */}
        {lowStock && (
          <Chip
            label={`فقط ${totalStock} باقی`}
            size="small"
            color="error"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              px: 1,
              py: 0.5,
              fontWeight: "bold",
              zIndex: 1,
            }}
          />
        )}

        {/* لایهٔ هاور */}
        <Fade in={hover} timeout={300}>
          <Box
            component={RouterLink}
            to={`/product/${product._id}`}
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none",
              px: 2,
              textAlign: "center",
              zIndex: 2,
            }}
            aria-label={`جزئیات محصول ${product.name}`}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              noWrap
              sx={{ maxWidth: "100%" }}
            >
              {product.name}
            </Typography>

            {/* اینجا از کامپوننت Rating سفارشی استفاده می‌کنیم */}
            <Rating
              value={product.rating || 0}
              text={`(${product.numReviews || 0})`}
              color="#f8e825"
            />

            <Typography
              variant="h5"
              sx={{
                my: 1,
                fontWeight: "bold",
                color: theme.palette.secondary.main,
              }}
            >
              {product.price?.toLocaleString() || "۰"} تومان
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              startIcon={<ShoppingCart />}
              sx={{
                mt: 1,
                borderRadius: 2,
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={(e) => e.preventDefault()} // جلوگیری از navigation هنگام کلیک
            >
              افزودن به سبد
            </Button>
          </Box>
        </Fade>
      </Box>

      {/* === بخش محتوا === */}
      <CardContent
        sx={{
          flexGrow: 1,
          px: 2,
          pt: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          noWrap
          title={product.name}
          sx={{
            color: theme.palette.text.primary,
            direction: "rtl", // رفع مشکل چیدمان متن فارسی
          }}
        >
          {product.name}
        </Typography>

        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 1 }}>
          {/* دوباره همینجا هم کامپوننت Rating را صدا می‌زنیم */}
          <Rating
            value={product.rating || 0}
            text={`(${product.numReviews || 0})`}
            color="#f8e825"
          />
        </Stack>

        <Typography
          variant="h6"
          sx={{
            mt: 1,
            fontWeight: "bold",
            color:
              theme.palette.mode === "dark"
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
          }}
        >
          {product.price?.toLocaleString() || "۰"} تومان
        </Typography>

        {/* نمایش نمونه‌های رنگ (Color Swatches) */}
        {product.colors?.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: 2,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {product.colors.map((col) => (
              <Box
                key={col}
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: col,
                  border: "2px solid",
                  borderColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[700]
                      : theme.palette.grey[300],
                  boxShadow: theme.shadows[1],
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
                title={`رنگ ${col}`}
              />
            ))}
          </Stack>
        )}
      </CardContent>

      {/* === دکمهٔ «مشاهده جزئیات» === */}
      <CardActions
        sx={{
          px: 2,
          pb: 2,
          mt: "auto", // چسباندن انتهای کارت
        }}
      >
        <Button
          component={RouterLink}
          to={`/product/${product._id}`}
          size="small"
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: 2,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
            borderColor:
              theme.palette.mode === "dark"
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
            "&:hover": {
              borderWidth: "2px",
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary.dark
                  : theme.palette.primary.dark,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary.light + "15"
                  : theme.palette.primary.light + "15",
            },
          }}
        >
          مشاهده جزئیات
        </Button>
      </CardActions>
    </Card>
  );
}
