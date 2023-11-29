import React, {useEffect, useState} from 'react'
import Header from './components/Header/Header'
import List from "./components/List/List"
import MapContainer from './components/MapContainer/MapContainer'
import { getPlacesData } from './api'
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';


function App() {

  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [boundary, setBoundary] = useState({});



  //get user location onload
  useEffect(() => {
    const updateUserLocation = ({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
      setBoundary({
        sw: { lat: latitude - 0.1, lng: longitude - 0.1 },
        ne: { lat: latitude + 0.1, lng: longitude + 0.1 },
      });
    };

    const handleGeolocationError = (error) => {
      console.error("Error getting geolocation:", error.message);
    };

    navigator.geolocation.getCurrentPosition(updateUserLocation, handleGeolocationError);
  }, []);

  useEffect(() => {
    console.log(coordinates, boundary)

    if (boundary && boundary.sw && boundary.ne) {
      getPlacesData(boundary.sw, boundary.ne)
        .then((data) => {
          console.log(data);
          setPlaces(data);
        })
        .catch((error) => {
          console.error("Error fetching places data:", error);
        });
    }
  }, [coordinates, boundary])

 

  return (
    <>
   
    <CssBaseline />
    <Header />
  
    <Grid container spacing={3} style={{width: "100%"}} p={4} >
        <Grid item xs={12} md={4} sx={{ overflowY: "scroll", maxHeight: "1100px"}}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <MapContainer 
            setCoordinates={setCoordinates}
            setBoundary={setBoundary}
            coordinates={coordinates}
          />
        </Grid>
    </Grid>
   
   
    </>
  )
}

export default App
