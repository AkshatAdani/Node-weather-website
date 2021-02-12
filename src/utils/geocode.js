const request = require('request');
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYWtzaGF0YWRhbmkiLCJhIjoiY2trcGVpeHpxMWpmZjJucHI3cnJ5bDl2YSJ9.-16jSbxms67t62Kg72HQXw&limit=1';
    request({url, json: true}, (error,{body})=>{
        if(error){
            callback('Unable to connect weather Api. Check your Network Connection.', undefined);
        }
        else if(body.message)
        {
            console.log("Please specify a valid location.",undefined);
        }
        else if(body.features.length===0)
        {
            callback("Invalid location.Please specify a valid location.", undefined);
        }
        else
        {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                Location: body.features[0].place_name
        });
        }
    });
};
   
module.exports = geocode;