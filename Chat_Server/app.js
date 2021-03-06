const app = require('express')(),
      routes = require('./routes/chatRoutes');

let enableCors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}

app.use(enableCors);

app.use('/api', routes);

module.exports = app;