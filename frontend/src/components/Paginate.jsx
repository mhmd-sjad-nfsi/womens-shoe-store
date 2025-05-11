import { Pagination, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

export default function Paginate({ page, pages, isAdmin = false }) {
  return pages > 1 ? (
    <Stack spacing={2} sx={{ my: 4, alignItems: 'center' }}>
      <Pagination
        count={pages}
        page={page}
        renderItem={(item) => (
          <Pagination.Item
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
  ) : null;
}
