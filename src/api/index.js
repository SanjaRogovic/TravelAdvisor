import axios from "axios"


export const getPlacesData = async (type, sw, ne) => {
    try {
        //set dynamically to receive type (hotels, restaurants) 
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
                tr_latitude: ne.lat,
              },
              headers: {
                'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_TRAVEL_API_KEY,
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
              },
        })

        return data
        
    } catch (error) {
        console.log(error.message)
    }

}

export const getWeatherData = async (lat, lng) => {
      try {
          const { data } = await axios.get('https://ai-weather-by-meteosource.p.rapidapi.com/nearest_place', {
            params: {
                lat: lat,
                lon: lng,
              },
              headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_WEATHER_API_KEY,
                'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
              }
          });

          return data;

      } catch (error) {
          console.error(error);
      }

}