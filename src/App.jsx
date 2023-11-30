import React, {useEffect, useState} from 'react'
import Header from './components/Header/Header'
import List from "./components/List/List"
import MapContainer from './components/MapContainer/MapContainer'
import { getPlacesData, getWeatherData } from './api'
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';


function App() {

  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [boundary, setBoundary] = useState({});
  const [childClicked, setChildclicked] = useState(null)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [autocomplete, setAutocomplete] = useState(null)
  const [weatherData, setWeatherData] = useState([])



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


  //filter for rating
  useEffect(() => {
    //if the selected place rating is larger that the current rating then return that specific place
    const filteredPlaces = places.filter((place) => place.rating > rating)

    setFilteredPlaces(filteredPlaces)

  }, [rating])


  useEffect(() => {
    // console.log(coordinates, boundary)

    if (boundary.sw && boundary.ne) {
      setLoading(true)

      getWeatherData(coordinates.lat, coordinates.lng)
      .then((data) => {
        console.log(data)
        setWeatherData(data)
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      }) 


      getPlacesData(type, boundary.sw, boundary.ne)
        .then((data) => {
          // console.log(data);
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0)); //check if the place has a name and reviews - get rid of dummy data
          setFilteredPlaces([])
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching places data:", error);
        })       
    }
  }, [type, boundary])

  console.log(places)
  console.log(filteredPlaces)


  //search bar in header
  const onLoad = (complete) => setAutocomplete(complete)

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()

    setCoordinates({lat, lng})
  }

 

  return (
    <>
    <CssBaseline />
    <Header onLoad={onLoad} onPlaceChanged={onPlaceChanged} />
  
    <Grid container spacing={3} style={{width: "100%"}} p={4} >
        <Grid item xs={12} md={4} sx={{ overflowY: "scroll"}}>
          <List 
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            loading={loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <MapContainer 
            setCoordinates={setCoordinates}
            setBoundary={setBoundary}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildclicked={setChildclicked}
            weatherData={weatherData}
          />
        </Grid>
    </Grid>
    </>
  )
}

export default App
