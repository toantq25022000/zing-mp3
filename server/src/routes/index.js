const authRoute = require('./auth');
const apiRoute = require('./api');
const cors = require("cors")


function route(app) {
    app.use('/api/auth', authRoute);
}

function route(app) {
    app.use('/api', cors(), apiRoute);
}

module.exports = route;
