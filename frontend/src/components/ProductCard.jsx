import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Stack,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Card
      sx={{
        height: "100%", // خیلی مهم: کارت همیشه ارتفاع ثابت داره
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/product/${product._id}`}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            height: 220, // ارتفاع ثابت برای عکس
            objectFit: "cover",
            p: 1,
            borderRadius: 3,
          }}
        />
        <CardContent sx={{ flexGrow: 1, width: "100%" }}>
          <Stack spacing={1}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              textAlign="center"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.name}
            </Typography>

            <Box display="flex" justifyContent="center">
              <Rating
                value={product.rating}
                precision={0.5}
                size="small"
                readOnly
              />
            </Box>

            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              textAlign="center"
            >
              {product.price.toLocaleString()} تومان
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
