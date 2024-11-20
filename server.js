const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: '/.env' });
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DB connections successful!'));

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`App is running of port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
