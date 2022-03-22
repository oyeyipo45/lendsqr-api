const express = require("express");
const app = express();
const router = express.Router();
const cors = require('cors');

const usersRouter = require("./api/api");

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cors());

router.use("/api/v1/", usersRouter);

app.get('/', (req, res) => {
  res.send(`LENDSQR API 1.0, ${process.env.NODE_ENV} server`);
});

app.use("/", router);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development' || 'production') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err.status,
    });
  });
}


module.exports = app;