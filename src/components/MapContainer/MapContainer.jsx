import React, {useState, useEffect} from 'react'
import GoogleMapReact from 'google-map-react';
import Typography from "@mui/material/Typography";
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Rating from '@mui/material/Rating';
import "./styles.css"


const MapContainer = ({setCoordinates, setBoundary, coordinates}) => {

  const isMobile = useMediaQuery("(min-width:600px)")

  const [mapCenter, setMapCenter] = useState({
    lat: coordinates.lat || 0,
    lng: coordinates.lng || 0,
  });

  useEffect(() => {
    // Update map center when coordinates change
    setMapCenter({ lat: coordinates.lat || 0, lng: coordinates.lng || 0 });
  }, [coordinates]);

  const defaultProps = {
    center: mapCenter,
    zoom: 14
  };
 

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{key: "AIzaSyDuwT_vt5GAZEjh7_LCJU3VRpTF7dStals"}}
        center={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        margin= {[50, 50, 50, 50]}
        option= {""}
        onChange={(e) => {
          // console.log(e)
          // setCoordinates({lat: e.center.lat, lng: e.center.lng})
          console.log('New Coordinates:', { lat: e.center.lat, lng: e.center.lng });
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBoundary({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
        }}
          
        onChild= {""}
      >
        
      </GoogleMapReact>
    </div>
  )
}

export default MapContainer