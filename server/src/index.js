require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const db = require('./config/db');
const route = require('./routes');
const PORT = 5000;

db.connect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

route(app);
    
app.listen(PORT, () => console.log(`Server start PORT ${PORT}`));