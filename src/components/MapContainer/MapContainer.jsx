import React, {useState, useEffect} from 'react'
import GoogleMapReact from 'google-map-react';
import Typography from "@mui/material/Typography";
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Rating from '@mui/material/Rating';
import "./styles.css"



const MapContainer = ({setCoordinates, setBoundary, coordinates, places, setChildClicked, weatherData}) => {

  const isDesktop = useMediaQuery("(min-width:600px)")
  

  // const [mapCenter, setMapCenter] = useState({
  //   lat: coordinates.lat || 0,
  //   lng: coordinates.lng || 0,
  // });

  // useEffect(() => {
  //   // Update map center when coordinates change
  //   setMapCenter({ lat: coordinates.lat || 0, lng: coordinates.lng || 0 });
  // }, [coordinates]);

  // const defaultProps = {
  //   center: mapCenter,
  //   zoom: 14
  // };
 

  return (
    <div style={{ height: "100vh", width: "100%" }} className='map-container'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        // center={defaultProps.center}
        // defaultZoom={defaultProps.zoom}
        margin={[50, 50, 50, 50]}
        option={{ disableDefaultUI: true, zoomControl: true }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBoundary({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onClick={(child) => setChildClicked(child)}
      >
        {places.map((place, index) => (
          <div
            className="markerContainer"
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={index}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className="paper">
                <Typography
                  className="typography"
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                className='pointer'
                  src={
                    place.photo
                      ? place.photo.images.small.url
                      : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1255/image-not-found.svg"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}

        {weatherData?.list?.length &&
          weatherData.list.map((data, i) => (
            <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                height="50px"
              />
            </div>
          ))}
          
      </GoogleMapReact>
    </div>
  );
}

export default MapContainer