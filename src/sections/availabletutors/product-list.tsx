import React, { useState } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { Typography } from '@mui/material';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { IProductItem } from 'src/types/product';
import ProductItem from './product-item';
import { ProductItemSkeleton } from './product-skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  products: IProductItem[];
  loading?: boolean;
};

export default function ProductList({ products, loading, ...other }: Props) {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(Number(event.target.value));
    setPage(1); // 重置頁碼到第一頁
  };

  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </>
  );

  const renderList = (
    <>
      {products.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </>
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        {...other}
      >
        {loading ? renderSkeleton : renderList}
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 8 }}>
        <Typography variant="body1" sx={{ mr: 2 }}>
          Items per page:
        </Typography>
        <Select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          variant="outlined"
          sx={{ minWidth: 50, mr: 2 }}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={12}>12</MenuItem>
        </Select>
        {products.length > itemsPerPage && (
          <Pagination
            count={Math.ceil(products.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{
              ml: 2,
              [`& .${paginationClasses.ul}`]: {
                justifyContent: 'center',
              },
            }}
          />
        )}
      </Box>
    </>
  );
}
