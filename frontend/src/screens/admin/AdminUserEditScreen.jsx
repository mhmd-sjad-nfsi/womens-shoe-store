import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Box,
  Stack,
} from '@mui/material';

export default function AdminUserEditScreen() {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
      return;
    }
    const fetchUser = async () => {
      try {
        setLoading(true);
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`/api/users/${userId}`, config);
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userInfo, userId, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(
        `/api/users/${userId}`,
        { name, email, isAdmin },
        config
      );
      setSuccess(true);
      setLoading(false);
      navigate('/admin/users');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Button component={RouterLink} to="/admin/users" sx={{ mb: 2 }}>
        ← بازگشت به لیست کاربران
      </Button>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          ویرایش کاربر
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        ) : (
          <Box component="form" onSubmit={submitHandler}>
            <Stack spacing={2}>
              {success && (
                <Alert severity="success">کاربر با موفقیت بروزرسانی شد</Alert>
              )}
              <TextField
                label="نام"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <TextField
                label="ایمیل"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                }
                label="ادمین"
              />
              <Button type="submit" variant="contained" fullWidth>
                ذخیره تغییرات
              </Button>
            </Stack>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
