// frontend/src/components/ProductCard.jsx

import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack,
  Rating,
  Button,
  Fade,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

export default function ProductCard({ product }) {
  const [hover, setHover] = useState(false);
  const totalStock = product.stock.reduce((sum, s) => sum + s.count, 0);
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
        transition: "transform 0.3s, box-shadow 0.3s",
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: 'relative', pt: '75%' /* 4:3 aspect ratio */ }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            ...(hover && { transform: 'scale(1.05)' }),
          }}
        />

        {/* Category Chip */}
        <Chip
          label={product.category}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: 'secondary.main',
            color: '#fff',
            px: 1,
            py: 0.5,
            fontWeight: 'bold',
            backdropFilter: 'blur(4px)',
          }}
        />

        {/* Low Stock Badge */}
        {lowStock && (
          <Chip
            label="موجودی کم"
            size="small"
            color="error"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              px: 1,
              py: 0.5,
              fontWeight: 'bold',
            }}
          />
        )}

        {/* Hover Overlay */}
        <Fade in={hover} timeout={300}>
          <Box
            component={RouterLink}
            to={`/product/${product._id}`}
            sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textDecoration: 'none',
              px: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" fontWeight="bold" noWrap>
              {product.name}
            </Typography>
            <Rating value={product.rating} precision={0.5} readOnly size="small" sx={{ mt: 0.5 }} />
            <Typography variant="h5" sx={{ my: 1, fontWeight: 'bold' }}>
              {product.price.toLocaleString()} تومان
            </Typography>
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              sx={{ mt: 1, borderRadius: 2 }}
            >
              افزودن به سبد
            </Button>
          </Box>
        </Fade>
      </Box>

      {/* Content Section */}
      <CardContent sx={{ flexGrow: 1, px: 2, pt: 2 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          noWrap
          title={product.name}
        >
          {product.name}
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 1 }}>
          <Rating value={product.rating} precision={0.5} size="small" readOnly />
          <Typography variant="caption" color="text.secondary">
            ({product.numReviews})
          </Typography>
        </Stack>
        <Typography variant="h6" color="primary" sx={{ mt: 1, fontWeight: 'bold' }}>
          {product.price.toLocaleString()} تومان
        </Typography>

        {/* Color Swatches */}
        {product.colors.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {product.colors.map((col) => (
              <Box
                key={col}
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: col,
                  border: '2px solid',
                  borderColor: 'background.paper',
                }}
              />
            ))}
          </Stack>
        )}
      </CardContent>

      {/* Action Buttons */}
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          component={RouterLink}
          to={`/product/${product._id}`}
          size="small"
          variant="outlined"
          fullWidth
          sx={{ borderRadius: 2 }}
        >
          مشاهده جزئیات
        </Button>
      </CardActions>
    </Card>
  );
}
