import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';

import { IProductItem } from 'src/types/product';
import { ITutorItem } from 'src/types/tutor';
import { useCheckoutContext } from '../checkout/context';

// ----------------------------------------------------------------------

type Props = {
  product: ITutorItem;
};

export default function ProductItem({ product }: Props) {
  const { onAddToCart } = useCheckoutContext();

  const { login, name, picture, location, available, sizes, priceSale } = product;
  // { id, name, picture, location, colors, available, sizes, priceSale, newLabel, saleLabel }
  //  const { id, name, coverUrl, price, colors, available, sizes, priceSale, newLabel, saleLabel }

  console.log(name);
  const linkTo = paths.product.details(login.uuid);

  const handleAddCart = async () => {
    const newProduct = {
      id: login.uuid,
      name,
      picture,
      available,
      price: location.timezone,
      size: sizes[0],
      quantity: 1,
    };
    try {
      onAddToCart(newProduct);
    } catch (error) {
      console.error(error);
    }
  };

  const renderLabels = 1 && (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ position: 'absolute', zIndex: 9, top: 16, right: 16 }}
    >
      {/*
      {newLabel.enabled && (
        <Label variant="filled" color="info">
          {newLabel.content}
        </Label>
      )}

      {saleLabel.enabled && (
        <Label variant="filled" color="error">
          {saleLabel.content}
        </Label>
      )}
  */}
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
          <Iconify icon="solar:cart-plus-bold" width={24} />
        </Fab>
      )}

      <Tooltip title={!available && 'Out of stock'} placement="bottom-end">
        <Image
          alt={name.first}
          src={picture.large}
          ratio="1/1"
          sx={{
            borderRadius: 1.5,
            ...(!available && {
              opacity: 0.48,
              filter: 'grayscale(1)',
            }),
          }}
        />
      </Tooltip>
    </Box>
  );

  const renderContent = (
    <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
      <Link component={RouterLink} href={linkTo} color="inherit" variant="subtitle2" noWrap>
        {name.first}
      </Link>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
          {priceSale && (
            <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
              {fCurrency(priceSale)}
            </Box>
          )}

          <Box component="span">{fCurrency(price)}</Box>
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

      {renderImg}

      {renderContent}
    </Card>
  );
}
