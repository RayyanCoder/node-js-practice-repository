const express = require('express');
const app = express();
const dotenv = require('dotenv');
const tourRoutes = require('./routes/tourRoutes');
dotenv.config({
    path:'./config.env'
});
const router = express.Router();
app.use(express.json());

app.use((req,res,next)=>{
    req.body.name1="rayyan shaikh";
    console.log('rayyan shaikh abdul majid')
    next();
})

    


app.use('/api/v1/tours',tourRoutes);
// app.post('/getdata',async(req,res)=>{
    
   
//     const createdTour = await tourModel.create(req.body);
//     res.status(200).json({
//         body:"hello world api",
//         data:createdTour
//     })
// });

module.exports = app;
// const PORT1 = process.dotenv.PORT;
