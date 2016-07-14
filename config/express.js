var config = require("./config"),
    express = require("express"),
    morgan = require("morgan"),
    compression = require("compression"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    session = require("express-session");


module.exports = function() {
  var app = express();

  if(process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
  } else if(process.env.NODE_ENV === "development") {
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(session({
    saveUnitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  require("../app/routes/index.server.routes")(app);

  app.use(express.static('./public'));

  return app;
};