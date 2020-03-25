const express = require("express");
const OngControlers = require("./controllers/OngController");
const incidentControlers = require("./controllers/incidentControler");
const profileContrelers = require("./controllers/profileControler");
const sessionControler = require("./controllers/sessionControler");
const routes = express.Router();
routes.post("/ongs", OngControlers.create);
routes.get("/ongs", OngControlers.index);

routes.post("/", sessionControler.create);

routes.get("/profile", profileContrelers.index);

routes.post("/incidents", incidentControlers.create);
routes.get("/incidents", incidentControlers.index);
routes.delete("/incidents/:id", incidentControlers.delete);

module.exports = routes;
