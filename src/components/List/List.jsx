import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import Details from "../Details/Details";
import "./styleslist.css";

const List = ({ places, childClicked, loading, type, setType, rating, setRating }) => {
 
  const [reference, setReference] = useState([]); // state for making the list scroll to the specific element using createRef hook

  console.log({ childClicked }); // try to click on the image and not on the name or rating as it might not get recognized being clicked

  useEffect(() => {
    //array constructor to construct as many elements as there are places then fill the array and map over that array
    //underscore used because we don't need first parameter only index. If reference doesn't exist then create new one using hook
    const references = Array(places?.length)
      .fill()
      .map((_, index) => reference[index] || createRef());

    setReference(references);
  }, [places]); //call this function every time the place has changed

  return (
    <div className="container">
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>

      {loading ? (
        <div className="loading">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className="form-control">

            <InputLabel className="input-label">Type</InputLabel>

            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>

          </FormControl>

          <FormControl className="form-control">

            <InputLabel>Rating</InputLabel>

            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>

          </FormControl>

          <Grid container spacing={3} className="list">
            {places?.map((place, index) => (
              <Grid item key={index} xs={12}>
                <Details
                  place={place}
                  selected={Number(childClicked) === index} //childClicked is a string so needs to be converted into number
                  refProp={reference[index]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
