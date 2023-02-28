import * as React from 'react';
import PropTypes from 'prop-types';
import {
  CardActionArea, CardMedia, ImageList, ImageListItem,
} from '@mui/material';
import { useRouter } from 'next/router';

export default function DesignList({ designs }) {
  const router = useRouter();

  return (
    <ImageList variant="masonry" cols={3} gap={12}>
      {designs.map((design) => (
        <ImageListItem key={design.id}>
          <CardActionArea onClick={() => router.push(`/designs/${design.id}`)}>
            <CardMedia component="img" src={`${design.imageUrl}?w=248&fit=crop&auto=format`} srcSet={`${design.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`} alt={design.style} loading="lazy" />
          </CardActionArea>
        </ImageListItem>
      ))}
    </ImageList>
  );
}

DesignList.propTypes = {
  designs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          price: PropTypes.number,
        }),
      ),
      room: PropTypes.string,
      style: PropTypes.string,
      imageUrl: PropTypes.string,
    }),
  ).isRequired,
};
