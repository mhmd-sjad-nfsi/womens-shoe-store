import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, resetUpdate } from "../redux/slices/userSlice";
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Stack,
} from "@mui/material";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { userInfo, loading, error, successUpdate } = useSelector(
    (state) => state.user
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
    return () => {
      dispatch(resetUpdate());
    };
  }, [userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("رمز عبور و تکرار آن مطابقت ندارند");
    } else {
      setMessage("");
      dispatch(updateUserProfile({ name, email, password }));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        پروفایل کاربری
      </Typography>
      <Stack spacing={2}>
        {message && <Alert severity="warning">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        {successUpdate && (
          <Alert severity="success">اطلاعات با موفقیت بروزرسانی شد</Alert>
        )}
        {loading && <CircularProgress />}

        <TextField
          label="نام"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="ایمیل"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="رمز عبور جدید"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="تکرار رمز عبور"
          type="password"
          fullWidth
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <Button variant="contained" onClick={submitHandler}>
          بروزرسانی پروفایل
        </Button>
      </Stack>
    </Container>
);
}
