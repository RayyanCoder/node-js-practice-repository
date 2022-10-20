const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({
  path:"./config.env"
});

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE;
mongoose.connect(DB,{
    useNewUrlParser: true
  }).then(()=>{
    console.log('database connected successsfully');
  });

  const PORT = process.env.PORT;
  const server = app.listen(PORT,()=>{
    console.log(`App running on Server ${PORT}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});