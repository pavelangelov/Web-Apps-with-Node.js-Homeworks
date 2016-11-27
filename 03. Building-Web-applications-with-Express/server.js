/* globals console */
"use strict";

const express = require("express");
const constants = require("./config/constants");
const config = require("./config/config");

require("./config/mongoose")(constants.connectionString);

let app = express();
let port = config.port;

require("./config/express")(config, app);
require("./config/route")(app);

app.listen(port, () => {
	console.log(`Our app is running on http://localhost:${port}`);
});