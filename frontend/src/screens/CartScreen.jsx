import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCart } from "../redux/slices/cartSlice";
import { Button, Typography, Grid, Box, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function CartScreen() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const updateCartHandler = (id, qty) => {
    dispatch(updateCart({ id, qty }));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        سبد خرید
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>سبد خرید شما خالی است!</Typography>
      ) : (
        <Grid container spacing={2}>
          {cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Box sx={{ display: "flex", alignItems: "center", p: 2, border: 1 }}>
                <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover' }} />
                <Box sx={{ ml: 2 }}>
                  <Typography>{item.name}</Typography>
                  <TextField
                    type="number"
                    value={item.qty}
                    onChange={(e) => updateCartHandler(item._id, e.target.value)}
                    sx={{ width: 60 }}
                  />
                  <Typography>{item.price.toLocaleString()} تومان</Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    حذف
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button
          component={RouterLink}
          to="/checkout"
          variant="contained"
          color="primary"
        >
          ادامه به تسویه حساب
        </Button>
      </Box>
    </Box>
  );
}
