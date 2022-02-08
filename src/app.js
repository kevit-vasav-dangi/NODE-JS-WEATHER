const path = require('path');
const express = require('express');
const hbs = require('hbs')
const app = express();  
const axios = require('axios');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const pathRoot=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(pathRoot))
app.get('',(req,res)=>{
    res.render('index',{
        name: 'asd',
        title:'weather'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'asd'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'asd'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'asd',
        errorMessage:'help not found'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send(
            {error:'plz provide sea'})
    }
    geocode(req.query.address,(error,data)=>{
        if (error){
                return res.send({
                    error
                })
        }
        // console.log(data)
        forecast(data.longitude,data.latitude,data.location,(error,forecastdata)=>{
            // console.log(forecastdata);    
            if(error){
                        return res.send({
                            error
                        })
                }
                res.send({
                    forecast:forecastdata,
                    location:data.location,
                    address:req.query.address
                    
                })
                // console.log('location: '+data.location)
                // console.log('data :'+forecastdata)
        })
})
    // res.send({
    //     address:req.query.address
    // })
    //console.log(req.query.address);
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'plz provide search q'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'asd',
        errorMessage:'page not found'
    })
})
app.listen(3000,()=>{
    console.log('port 3000 started');
})