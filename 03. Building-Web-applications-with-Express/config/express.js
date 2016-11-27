"use strict";

const express = require("express");
const bodyParser = require("body-parser");
let router = express.Router();

module.exports = (config, app) => {
	app.set("view engine", "pug");
	app.set("views", `${config.path}/views`);

	// here load other routs
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use("/static", router);
	app.use("/static", express.static(`${config.path}/public`));
};