import React, { useState, useEffect, useCallback } from "react";
import { CocktailItem } from "../components/CocktailItem";
import { Cocktails } from "../models/cocktail";
import { Backdrop, Grid, TextField, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

export const Homepage = () => {
  const [cocktails, setCocktails] = useState<Cocktails>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    const data = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`
    ).then((response) => response.json());
    setCocktails(data.drinks);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = async(event: React.ChangeEvent<HTMLInputElement>) => {
      const data = await fetch(
      `https:/www.thecocktaildb.com/api/json/v1/1/search.php?s=${event.target.value}`
    ).then((response) => response.json());
    setCocktails(data.drinks);
    setCurrentPage(1);
    setHasMore(true);
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    if (nextPage > 5) {
      setHasMore(false);
      return;
    }
    setCurrentPage(nextPage);
  };

  return (
    <div style={{ padding: "16px" }}>
      <TextField
        style={{ marginBottom: "16px" }}
        fullWidth
        variant="filled"
        color="primary"
        size="small"
        placeholder="Search cocktails..."
        onChange={handleSearch}
      />
      <InfiniteScroll
        dataLength={currentPage * 20}
        hasMore={hasMore}
        next={loadMore}
        loader={<Backdrop open={false} />}
        endMessage={<Typography color="white"> That's all! </Typography>}
      >
        <Grid container spacing={2}>
          {cocktails!==null && cocktails.slice(0, currentPage * 20).map((cocktail) => (
            <Grid key={cocktail.idDrink} item xs={12} sm={6} md={4} lg={3}>
              <CocktailItem cocktail={cocktail} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};
