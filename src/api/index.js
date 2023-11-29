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
                'x-rapidapi-key': '35c041eeeamsh13dae2e88ab7f6dp1a897cjsn509381ed6445',
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
              },
        })

        return data
        
    } catch (error) {
        console.log(error.message)
    }

}