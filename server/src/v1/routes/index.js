const authRoute = require("./auth");
const apiRoute = require("./api");

function route(app) {
  app.use("/v1/api", apiRoute);
  app.use("/v1/api/auth", authRoute);
}

module.exports = route;
