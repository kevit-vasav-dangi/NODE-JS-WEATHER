const axios = require('axios')

const geocode=(address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoidmFzYXYtMTAiLCJhIjoiY2t6NTRraGIyMGxuczJuazJsYW5raXV6ayJ9.Exy-TpO5Qhk3X6QD9WqD8A&limit=1"
    axios.get(url)
    .then(({data})=>{
        //console.log(data);
        if(data.features.length === 0){
                callback('Unable to find location. Try another search',undefined)
            }else{
                callback(undefined, {
                    latitude: data.features[0].center[1],
                    longitude: data.features[0].center[0],
                    location: data.features[0].place_name
                })
            }
        
    })
    .catch((error)=>{

        if(!error.response){
        callback('Unable to connect to location services',undefined)
        }
    })
}
module.exports=geocode