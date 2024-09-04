import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material";
import { Comics } from "dh-marvel/pages/index.page";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ComicProp {
  info: Comics;
}

const Item = styled(Paper)(() => ({
  backgroundColor: "#cce6ff", // Celeste claro
  color: "black",
  padding: "15px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "18px",
  fontWeight: "bold",
  width: "400px",
  height: "400px",
  margin: "10px",
  border: "3px solid rgba(0, 0, 0, 0.2)",
  boxShadow: "3px 3px 3px 2px rgba(0, 0, 0, 0.2)",
  gap: "10px",
}));

const Comic: NextPage<ComicProp> = ({ info }) => {
  const img = info.thumbnail.path + "." + info.thumbnail.extension;
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={6}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Item>
        <Image src={img} width={190} height={240} alt={info.title} />
        <Typography>{info.title}</Typography>

        <Box>
          <Link href={`/checkout/${info.id}`}>
            <Button variant="contained" color="primary">
              Comprar
            </Button>
          </Link>
          <Link href={`/comics/${info.id}`}>
            <Button variant="outlined" color="secondary">
              Ver detalles
            </Button>
          </Link>
        </Box>
      </Item>
    </Grid>
  );
};

export default Comic;
