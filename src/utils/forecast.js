const axios = require('axios')
const forecast=(longitude,latitude,location,callback)=>{


const url = "http://api.weatherstack.com/current?access_key=88a94fb8826fa8aa4d2ea433b8c79b66&query="+encodeURIComponent(longitude)+","+encodeURIComponent(latitude)+"&units=f"
// console.log(url)
    axios.get(url)
    .then((response) =>{
        // console.log(response)
        // console.log('check data =',data)
        //console.log('check error =',error)

            if(response.error){
                callback('Unable to connect to location',undefined)
            }
            else{
                // console.log(error)
            callback(undefined,'It is currently ' +  response.data.current.temperature + ' degrees out.' +'There is a '+ response.data.current.precip + '% chance of rain.')
            }
    })
    .catch((error)=>{
         console.log(error)
        
            if(!error.response){
            callback('Unable to connect to weather services', undefined)

            }
        })
}
module.exports=forecast