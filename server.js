const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

const DB = 'mongodb+srv://root:root@cluster0.7j6i3wo.mongodb.net/test'
mongoose.connect(DB,{
    useNewUrlParser: true
  }).then(()=>{
    console.log('database connected successsfully');
  });

  const server = app.listen(4000,()=>{
    console.log('app running sucess fully');
});