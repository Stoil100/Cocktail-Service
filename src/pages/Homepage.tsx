import React, { useState, useEffect, useCallback } from "react";
import { CocktailItem } from "../components/CocktailItem";
import { Cocktails } from "../models/cocktail";
import { Grid, TextField, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "../components/Loader";

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
    <div style={{ padding: "16px",display:"flex", alignItems:"center", flexDirection:"column" }}>
      <TextField
        sx={{ marginBottom: "16px", backgroundColor: "#fff", borderRadius:"10px"}}
        fullWidth
        variant="filled"
        size="small"
        placeholder="Search cocktails..."
        onChange={handleSearch}
      />
      <InfiniteScroll
        dataLength={currentPage * 20}
        hasMore={hasMore}
        next={loadMore}
        loader={<Loader isOpen={!hasMore}/>}
        endMessage={<Typography color="white"> That's all! </Typography>}
        style={{width:"75vw",}}
      >
        <Grid container spacing={3}>
          {cocktails!==null && cocktails.slice(0, currentPage * 20).map((cocktail) => (
            <Grid key={cocktail.idDrink} item xs={4}>
              <CocktailItem cocktail={cocktail} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};
