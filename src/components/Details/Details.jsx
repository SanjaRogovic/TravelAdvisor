import React, {useEffect} from "react";

import Box from '@mui/system/Box';
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Rating from "@mui/material/Rating";

import "../Details/stylesdetails.css"

const Details = ({ place, selected, refProp }) => {
  // console.log(place);

  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });


  return (
    <Card elevation={6}>
      <CardMedia
        sx={{ height: 350 }}
        image={
          place.photo ? place.photo.images.large.url :
          "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1255/image-not-found.svg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>

        <Box display="flex" justifyContent="space-between" my={2} >
          <Rating name="read-only" value={Number(place.rating)} readOnly/>
          <Typography component="legend">
          {place.num_reviews} reviews {place.num_reviews > 1}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between"  >
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        
        <Box display="flex" justifyContent="space-between" >
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>

        {place?.awards?.map((award) => (
          <Box
            my={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <img src={award.images.small} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}

        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className="chip" />
        ))}

        {place?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className="subtitle"
          >
            <LocationOnIcon /> {place.address}
          </Typography>
        )}

        {place?.phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className="spacing"
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
        </CardContent>

        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.web_url, "_blank")}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      
    </Card>
  );
};

export default Details;
