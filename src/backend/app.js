const express = require("express");
const app = express();
const router = express.Router();

const usersRouter = require("./api/api");

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

router.use("/api/v1/", usersRouter);

app.use("/", router);

module.exports = app;