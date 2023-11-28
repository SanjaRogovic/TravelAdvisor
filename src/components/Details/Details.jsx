import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Rating from "@mui/material/Rating";

import "./stylesdetails.css";
import { LocationCityOutlined, LocationOn } from "@mui/icons-material";
import Phone from "@mui/icons-material/Phone";

const Details = ({ place }) => {
  console.log(place);

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: "350" }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "Error displaying the image"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
          <Typography variant="subtitle1">Ranking</Typography>
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
            <img src={award.images.small} alt={award.display_name} />
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
      </CardContent>
    </Card>
  );
};

export default Details;
