import { Grid } from "@mui/material";
import { IndexProps } from "dh-marvel/pages/index.page";
import type { NextPage } from "next";
import React from "react";
import Comic from "./Comic";

const GrillaComics: NextPage<IndexProps> = ({ data }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      padding={5}
    >
      {data?.results?.map((d) => (
        <Comic info={d} key={d.id} />
      ))}
    </Grid>
  );
};

export default GrillaComics;
