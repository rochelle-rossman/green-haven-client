/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Welcome() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '100%',
          height: '100%',
        },
      }}
    >
      <Typography variant="subtitle1">
        <b>Welcome to Green Haven!</b> We offer a wide selection of houseplants, decor items, and plant care products. Our design inspiration photos will give you plenty of ideas for how to style your space. Whether you're a seasoned plant parent or just starting out, we have everything you need to create your own <i>green haven</i>.
      </Typography>
    </Box>
  );
}
