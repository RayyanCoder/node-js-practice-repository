const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const tourRoutes = require('./routes/tourRoutes');
dotenv.config({
    path:'./config.env'
});


app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//Middle ware for requested time and adding name of myself
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });


app.use((req,res,next)=>{
    req.body.name1="rayyan shaikh";
    console.log('rayyan shaikh abdul majid')
    next();
})

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  

  
  app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });
    

//3)routes for handling request
app.use('/api/v1/tours',tourRoutes);
// app.post('/getdata',async(req,res)=>{
    
   
//     const createdTour = await tourModel.create(req.body);
//     res.status(200).json({
//         body:"hello world api",
//         data:createdTour
//     })
// });
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
module.exports = app;
// const PORT1 = process.dotenv.PORT;
