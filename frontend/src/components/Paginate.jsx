// frontend/src/components/Paginate.jsx
import React from 'react';
import { Pagination, PaginationItem, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Paginate({ page, pages, isAdmin = false }) {
  if (pages <= 1) return null;

  return (
    <Stack spacing={2} sx={{ my: 4, alignItems: 'center' }}>
      <Pagination
        count={pages}
        page={page}
        renderItem={(item) => (
          <PaginationItem
            component={RouterLink}
            to={
              !isAdmin
                ? `/?pageNumber=${item.page}`
                : `/admin/products?pageNumber=${item.page}`
            }
            {...item}
          />
        )}
      />
    </Stack>
  );
}
