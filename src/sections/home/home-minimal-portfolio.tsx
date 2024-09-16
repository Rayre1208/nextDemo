import { useState } from 'react';
import { m } from 'framer-motion';

import { textGradient } from 'src/theme/css';

//import { useRef, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
// import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
//import { alpha } from '@mui/material/styles';

import { HEADER } from 'src/layouts/config-layout';

import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

//import { bgBlur, bgGradient, textGradient } from 'src/theme/css';
// ----------------------------------------------------------------------

const StyledTextGradient = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  padding: 0,
  marginTop: 8,
  lineHeight: 1,
  fontWeight: 900,
  marginBottom: 24,
  letterSpacing: 8,
  textAlign: 'center',
  backgroundSize: '400%',
  fontSize: `${64 / 16}rem`,
  fontFamily: theme.typography.fontSecondaryFamily,
  [theme.breakpoints.up('md')]: {
    fontSize: `${96 / 16}rem`,
  },
}));

export default function HomeMinimalTest() {
  const theme = useTheme();

  const [percent, setPercent] = useState(0);

  //const lightMode = theme.palette.mode === 'light';

  const renderDescription = (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        mx: 'auto',
        maxWidth: 480,
        mt: {
          md: `-${HEADER.H_DESKTOP + percent * 2.5}px`,
        },
      }}
    >
      <m.div variants={varFade().inUp}>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            paddingTop: '30%', // 增加 padding-top
          }}
        >
          Hi I&apos;m
        </Typography>

        <StyledTextGradient
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
          sx={{
            lineHeight: '1.3', // 設置行高
          }}
        >
          Ray
        </StyledTextGradient>

        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Front End Developer
        </Typography>
      </m.div>

      <Stack
        spacing={0.75}
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ my: 3 }}
      >
        <m.div variants={varFade().inUp}>
          <Rating readOnly value={4.95} precision={0.1} max={5} />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            <Box component="strong" sx={{ mr: 0.5, color: 'text.primary' }}>
              4.96/5
            </Box>
            (99+ reviews)
          </Typography>
        </m.div>
      </Stack>

      <Stack spacing={1.5} direction={{ xs: 'column-reverse', sm: 'row' }} sx={{ mb: 5 }}>
        <Stack alignItems="center" spacing={2}>
          <m.div variants={varFade().inUp}>
            <Button
              component={RouterLink}
              href={paths.dashboard.root}
              color="inherit"
              size="large"
              variant="contained"
              startIcon={<Iconify icon="eva:flash-fill" width={24} />}
            >
              Live Preview
            </Button>
          </m.div>
        </Stack>
      </Stack>

      <Stack spacing={3} sx={{ textAlign: 'center' }}>
        <m.div variants={varFade().inUp}>
          <Typography variant="overline" sx={{ opacity: 0.48 }}>
            Available From
          </Typography>
        </m.div>

        <Stack spacing={2} direction="row" justifyContent="center">
          {['js', 'ts', 'figma', 'nextjs', 'vite'].map((icon) => (
            <m.div variants={varFade().inUp}>
              <Box
                component="img"
                alt={icon}
                src={`/assets/icons/platforms/ic_${icon}.svg`}
                sx={{ width: 24, height: 24 }}
              />
            </m.div>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );

  const renderPortrait = (
    <Stack
      spacing={3}
      sx={{
        maxWidth: '100%',
        textAlign: 'center',
        mb: { xs: 5, md: 10 },
      }}
    >
      <m.div variants={varFade().inUp}>
        <Box
          component="img"
          alt="auth"
          src="/assets/illustrations/selfie/fullSuitBodyTransparent.png"
          sx={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </m.div>
    </Stack>
  );

  const renderInformation = (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        mx: 'auto',
        maxWidth: 480, //480
        mt: {
          md: `-${HEADER.H_DESKTOP + percent * 2.5}px`,
        },
      }}
    >
      <m.div variants={varFade().inUp}>
        <Typography
          variant="subtitle2"
          sx={{
            color: theme.palette.success.main,
          }}
        >
          Expert on
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'start',
          }}
        >
          Based in Taiwan <br />
          i&apos;m developer and <br />
          UI/UX designer.
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          variant="caption"
          sx={{
            textAlign: 'center',
            color: theme.palette.grey[500],
          }}
        >
          Hey are looking for designer to build
          <br />
          your brand and grow your business?
          <br />
          let&apos;s shake hand with me.
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          React Developer
        </Typography>
      </m.div>
    </Stack>
  );

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 2, md: 2 },
      }}
    >
      <Grid container columnSpacing={0} sx={{ height: 1 }} data-testid="tester">
        <Grid xs={12} md={3}>
          {renderDescription}
        </Grid>
        <Grid xs={12} md={6}>
          {renderPortrait}
        </Grid>
        <Grid xs={12} md={3}>
          {renderInformation}
        </Grid>
      </Grid>
    </Container>
  );
}
