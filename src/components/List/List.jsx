import React, {useState} from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select  } from '@mui/material'
import Details from "../Details/Details"
import "./styleslist.css"

const List = () => {

  const [type, setType] = useState("restaurants")
  const [rating, setRating] = useState("")

  const places = [ 
    { name: "Cool Place"},
    { name: "Best Beer"},
    { name: "Best Steak"},
    { name: "Cool Place"},
    { name: "Best Beer"},
    { name: "Best Steak"},
    { name: "Cool Place"},
    { name: "Best Beer"},
    { name: "Best Steak"},
  ]

  return (
    <div className='container'>
      <Typography variant='h4'>
        Restaurants, Hotels & Attractions around you
      </Typography>
      <FormControl className='form-control'>
        <InputLabel className='input-label'>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className='form-control'>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3} className='list'>
        {places?.map((place, index) => (
          <Grid item key={index} xs={12}>
            <Details place={place}/>
          </Grid>
        ))}

      </Grid>

    </div>
  )
}

export default List