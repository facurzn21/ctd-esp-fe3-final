import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";

interface ComicDetailProps {
  comic: {
    id: number;
    title: string;
    description: string;
    thumbnail: { path: string; extension: string };
    price: number;
    oldPrice: number;
    stock: number;
    characters: { id: number; name: string }[];
  };
}

const ComicDetail: React.FC<ComicDetailProps> = ({ comic }) => {
  const imageUrl = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;

  return (
    <Box>
      <Typography variant="h3">{comic.title}</Typography>
      <Image src={imageUrl} alt={comic.title} width={500} height={750} />
      <Typography>{comic.description}</Typography>
      <Typography>Price: ${comic.price}</Typography>
      {comic.oldPrice && <Typography>Old Price: ${comic.oldPrice}</Typography>}
      <Typography>
        Stock: {comic.stock > 0 ? "In Stock" : "Out of Stock"}
      </Typography>
      <Button variant="contained" color="primary" disabled={comic.stock === 0}>
        {comic.stock > 0 ? "Buy Now" : "Out of Stock"}
      </Button>
      <Box>
        <Typography variant="h5">Characters:</Typography>
        <ul>
          {comic.characters.map((character) => (
            <li key={character.id}>
              <a href={`/characters/${character.id}`}>{character.name}</a>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default ComicDetail;
