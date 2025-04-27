// src/components/ProductCard.jsx

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 3,
        transition: 'transform 0.3s ease',
        ':hover': { transform: 'scale(1.03)' },
      }}
    >
      <CardActionArea component={RouterLink} to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            height: 250,
            objectFit: 'cover',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: '3rem',
            }}
          >
            {product.name}
          </Typography>

          <Box display="flex" alignItems="center" mb={1}>
            <Rating
              value={product.rating}
              precision={0.5}
              readOnly
              size="small"
              sx={{ direction: 'ltr' }}
            />
            <Typography variant="body2" color="text.secondary" ml={1}>
              ({product.numReviews})
            </Typography>
          </Box>

          <Typography variant="subtitle1" fontWeight="bold" color="primary" mb={1}>
            {product.price.toLocaleString()} تومان
          </Typography>

          <Chip
            label={product.countInStock > 0 ? 'موجود' : 'ناموجود'}
            color={product.countInStock > 0 ? 'success' : 'error'}
            size="small"
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
