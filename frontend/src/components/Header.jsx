import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          فروشگاه کفش زنانه
        </Typography>

        {userInfo ? (
          <Box>
            <Button color="inherit">{userInfo.name}</Button>
            <Menu>
              <MenuItem onClick={logoutHandler}>خروج</MenuItem>
            </Menu>
          </Box>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">
              ورود
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              ثبت‌نام
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
