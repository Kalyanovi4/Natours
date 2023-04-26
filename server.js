const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connections successful!'));

const port = 3000 || process.env.port;
const server = app.listen(port, () => {
  console.log(`App is running of port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
