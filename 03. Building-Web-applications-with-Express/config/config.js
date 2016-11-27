"use strict";

const path = require("path");
const developmentPort = 3001;

let rootPath = path.normalize(path.join(__dirname, "/../"));

module.exports = {
	db: "mongodb://localhost:27017/team-undefined-db",
	port: developmentPort,
	path: rootPath
};