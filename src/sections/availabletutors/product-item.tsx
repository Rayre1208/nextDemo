import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';

import { IProductItem } from 'src/types/product';

import { useCheckoutContext } from '../checkout/context';

// ----------------------------------------------------------------------

type Props = {
  product: IProductItem;
};

export default function ProductItem({ product }: Props) {
  const ratingValue = (Math.sqrt(product.totalRatings * 20) * 10).toFixed(0);
  const { onAddToCart } = useCheckoutContext();
  const theme = useTheme();

  const {
    id,
    name,
    coverUrl,
    price,
    colors,
    available,
    sizes,
    priceSale,
    newLabel,
    saleLabel,
    randomtutors,
  } = product;

  const baseOptions = {
    // Colors
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.success.main,
      theme.palette.warning.dark,
      theme.palette.success.darker,
      theme.palette.info.dark,
      theme.palette.info.darker,
    ],
  };

  const linkTo = paths.product.details(id);

  const handleAddCart = async () => {
    const newProduct = {
      id,
      name,
      coverUrl,
      available,
      price,
      colors: [colors[0]],
      size: sizes[0],
      quantity: 1,
    };
    try {
      onAddToCart(newProduct);
    } catch (error) {
      console.error(error);
    }
  };

  const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ position: 'absolute', zIndex: 9, top: 16, right: 16 }}
    >
      {newLabel.enabled && (
        <Label variant="filled" color="info">
          {`Super Tutor`}
        </Label>
      )}
      {saleLabel.enabled && (
        <Label variant="filled" color="error">
          {'NEW'}
        </Label>
      )}
    </Stack>
  );

  const renderOnlineLabels = (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ position: 'absolute', zIndex: 9, top: 16, left: 16 }}
    >
      {available >= 1 ? (
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: theme.palette.success.main,
            border: '2px solid white',
          }}
        />
      ) : (
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: theme.palette.grey[700],
            border: '2px solid white',
          }}
        />
      )}
    </Stack>
  );

  const renderImg = (
    <Box sx={{ position: 'relative', p: 1 }}>
      {!!available && (
        <Fab
          color="warning"
          size="medium"
          className="add-cart-btn"
          onClick={handleAddCart}
          sx={{
            right: 16,
            bottom: 16,
            zIndex: 9,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('all', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <Iconify icon="solar:call-medicine-bold-duotone" width={28} />
        </Fab>
      )}

      <Tooltip title={!available && 'Out of stock'} placement="bottom-end">
        <Image
          alt={name}
          src={product.randomtutors?.picture?.large}
          ratio="1/1"
          sx={{
            borderRadius: 1.5,
          }}
        />
      </Tooltip>
    </Box>
  );

  const renderContent = (
    <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
      <Link
        component={RouterLink}
        href={linkTo}
        color="inherit"
        style={{ fontWeight: 'bold', fontSize: '18px' }}
        noWrap
      >
        {`${randomtutors?.name.first} ${randomtutors?.name.last}`}
      </Link>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Iconify
          icon={`flagpack:${randomtutors?.nat.toLowerCase()}`}
          sx={{ borderRadius: 0.65, width: 28 }}
        />

        <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
          <Box component="span">{`👍 ${ratingValue} % `}</Box>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      {renderLabels}
      {renderOnlineLabels}
      {renderImg}

      {renderContent}
    </Card>
  );
}
