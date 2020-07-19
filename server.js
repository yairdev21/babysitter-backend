const express = require('express');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const addWorkerRoutes = require('./routes/worker.route');

const app = express();

app.use(express.static('public'));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(
  cors({
    origin: ['*'],
    credentials: true // enable set cookie
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'xxxx',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
 //app.use(history());

app.get('/', (req, res) => {
  res.send('Hello');
});

addWorkerRoutes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('listening at', port));
