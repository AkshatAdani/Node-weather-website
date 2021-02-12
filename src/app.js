const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const chalk = require('chalk');

//Define paths for express config
const publicPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views loaction 
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup Static directory to serve.
app.use(express.static(publicPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akshat adani'
    });
})
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akshat adani'
    });
})
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Akshat adani',
        message: 'How can we help you?'
    });
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a valid address!!'
        });

    }else{
        geocode(req.query.address,(error,{latitude,longitude,Location}={})=>{
                if(error){
                    return res.send({error});
                }   
                forecast(latitude,longitude, (error, {Forecast}={}) => {
                    if(error){
                        return res.send({error});
                    }
        
                    res.send({latitude,
                        longitude,
                        Forecast,
                        Location
                        });
                });
            });
        }
    });
            

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });

    }else{
        console.log(req.query);
        res.send({
            products:[]
    });
}
});

app.get('/help/*', (req, res)=>{
    res.render('Error',{
        title: '404',
        name: 'Akshat adani',
        errorMessage: 'Help article not found'
    });
});
app.get('*', (req, res)=>{
    res.render('Error',{
        title: '404',
        name: 'Akshat adani',
        errorMessage: 'Page not found'
    })
   

});

app.listen(3000, ()=>{
        console.log('Server is up on 3000.')
});

