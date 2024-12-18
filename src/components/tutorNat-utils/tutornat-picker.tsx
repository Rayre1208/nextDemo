import { forwardRef, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import Iconify from '../iconify';
import { TutorNATProps } from './types';

// ----------------------------------------------------------------------

const TutorNAT = forwardRef<HTMLDivElement, TutorNATProps>(
  ({ tutorsNAT, selected, onSelectTutorNat, limit = 'auto', sx, ...other }, ref) => {
    const singleSelect = typeof selected === 'string';

    const handleSelect = useCallback(
      (nat: string) => {
        if (singleSelect) {
          if (nat !== selected) {
            onSelectTutorNat(nat);
          }
        } else {
          const newSelected = selected.includes(nat)
            ? selected.filter((value) => value !== nat)
            : [...selected, nat];

          onSelectTutorNat(newSelected);
        }
      },
      [onSelectTutorNat, selected, singleSelect]
    );

    return (
      <Stack
        ref={ref}
        direction="row"
        display="inline-flex"
        sx={{
          flexWrap: 'wrap',
          ...(limit !== 'auto' && {
            width: limit * 36,
            justifyContent: 'flex-end',
          }),
          ...sx,
        }}
        {...other}
      >
        {tutorsNAT.map((nat) => {
          const hasSelected = singleSelect ? selected === nat : selected.includes(nat);

          return (
            <ButtonBase
              key={nat}
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
              }}
              onClick={() => {
                handleSelect(nat);
              }}
            >
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
                  ...(hasSelected && {
                    transform: 'scale(1.4)',
                    transition: (theme) =>
                      theme.transitions.create('all', {
                        duration: theme.transitions.duration.shortest,
                      }),
                  }),
                }}
              >
                <Iconify
                  icon={`flagpack:${nat.toLowerCase()}`}
                  width={hasSelected ? 24 : 20}
                  sx={{
                    transition: (theme) =>
                      theme.transitions.create('all', {
                        duration: theme.transitions.duration.shortest,
                      }),
                    ...(hasSelected && {
                      borderBottom: '2.5px solid',
                      borderColor: 'primary.main',
                      backgroundColor: alpha('#000000', 0.08),
                    }),
                  }}
                />
              </Stack>
            </ButtonBase>
          );
        })}
      </Stack>
    );
  }
);

export default TutorNAT;
