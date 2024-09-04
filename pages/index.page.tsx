import type { NextPage } from "next";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import GrillaComics from "dh-marvel/components/home/GrillaComics";

export interface IndexProps {
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Comics[];
  };
}

export type Comics = {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

const Index: NextPage<IndexProps> = ({ data }) => {
  const [offset, setOffset] = useState(0);
  const [comicList, setComicList] = useState(data);

  const handlePrevClick = async () => {
    const newOffset = Math.max(0, offset - data.limit);
    setOffset(newOffset);
    const newData = await fetchNewData(newOffset);
    setComicList(newData);
  };

  const handleNextClick = async () => {
    const newOffset = offset + data.limit;
    setOffset(newOffset);
    const newData = await fetchNewData(newOffset);
    setComicList(newData);
  };

  const fetchNewData = async (newOffset: number) => {
    const res = await fetch(
      `https://gateway.marvel.com/v1/public/comics?ts=1000&apikey=9c13f09d734436992a5f806b1b485adf&hash=01f538a62c398bbe3eeeaf75172af46d&limit=12&offset=${newOffset}`
    );
    const newData = await res.json();
    return newData.data;
  };

  return (
    <>
      <Head>
        <title>Marvel App</title>
        <meta name="description" content="A list of Marvel Comics for sale" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BodySingle title={"Comics"}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "85%",
              display: "flex",
              justifyContent: "space-between",
              margin: "20px",
            }}
          >
            <Button
              onClick={handlePrevClick}
              size="medium"
              variant="contained"
              disabled={offset === 0}
            >
              Prev
            </Button>
            <Button
              disabled={offset + data.limit >= data.total}
              onClick={handleNextClick}
              size="medium"
              variant="contained"
            >
              Next
            </Button>
          </Box>
        </Box>

        <GrillaComics data={comicList} />
      </BodySingle>
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(
    `http://gateway.marvel.com/v1/public/comics?ts=1000&apikey=9c13f09d734436992a5f806b1b485adf&hash=01f538a62c398bbe3eeeaf75172af46d&limit=12`
  );
  const data = await res.json();

  return {
    props: {
      data: data.data,
    },
  };
};

export default Index;
