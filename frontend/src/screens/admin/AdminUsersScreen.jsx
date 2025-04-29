import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export default function AdminUsersScreen() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get('/api/users', config);
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('آیا از حذف این کاربر مطمئن هستید؟')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`/api/users/${id}`, config);
        fetchUsers();
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) fetchUsers();
    else navigate('/login');
  }, [userInfo, navigate]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        مدیریت کاربران
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>آیدی</TableCell>
                <TableCell>نام</TableCell>
                <TableCell>ایمیل</TableCell>
                <TableCell>ادمین</TableCell>
                <TableCell>عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u._id}>
                  <TableCell>{u._id}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.isAdmin ? '✔️' : '❌'}</TableCell>
                  <TableCell>
                    <IconButton
                      component={RouterLink}
                      to={`/admin/user/${u._id}/edit`}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => deleteHandler(u._id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
