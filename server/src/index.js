require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./v1/config/db");
const route = require("./v1/routes");
const cors = require("cors");
const PORT = 5000;

db.connect();
//cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Authorization", "Accept", "Content-Type"],
  })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

route(app);

app.listen(PORT, () => console.log(`Server start PORT ${PORT}`));
