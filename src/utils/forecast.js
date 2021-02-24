const request = require('request');
const forecast = (latitude, longitude,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=7a95bfd786e5e797e016b7e2b3153556&query=' + latitude +','+ longitude;

    request({url, json: true},(error, {body})=>{
        if(error){
            callback("Unable to connect weather Api.", undefined);
        }
        else if(body.error)
        {
            callback(body.error.info, undefined);
        }
        else
        {
            callback(undefined, {
                                    Forecast: body.current.weather_descriptions[0],
                                 Temperature: body.current.temperature 
                                //  Location: body.location.name + ', '+ body.location.region + ', ' + body.location.country + '.'
                            });
        }

});

}

function geoFindMe() {
    
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude);
      console.log(longitude);
    }
    
    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
    
}
    
    



module.exports = forecast;