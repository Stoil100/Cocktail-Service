import React, { useState, useEffect, useCallback } from "react";
import { CocktailItem } from "../components/CocktailItem";
import { Cocktails } from "../models/cocktail";
import { Backdrop, Grid, TextField, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

export const Homepage = () => {
  const [cocktails, setCocktails] = useState<Cocktails>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async()=>{
    const data = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`
    ).then((response) => response.json());
    setCocktails(data.drinks);
  },[])

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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

  const filteredCocktails = cocktails.filter((cocktail) =>
    cocktail.strDrink.toLowerCase().includes(searchTerm!.toLowerCase())
  );

  return (
    <div style={{ padding: "16px" }}>
      <TextField
        style={{ marginBottom: "16px", }}
        fullWidth
        variant="filled"
        color="primary"
        size="small"
        placeholder="Search cocktails..."
        onChange={handleSearch}
      />
      <InfiniteScroll
        dataLength={currentPage *20}
        hasMore={hasMore}
        next={loadMore}
        loader={<Backdrop open={false}
         />}
         endMessage={
          <Typography color="white"> That's all! </Typography>
        }>
          
        <Grid container spacing={2}>
          {filteredCocktails.slice(0, currentPage * 20).map((cocktail) => (
            <Grid key={cocktail.idDrink} item xs={12} sm={6} md={4} lg={3}>
              <CocktailItem cocktail={cocktail} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};
