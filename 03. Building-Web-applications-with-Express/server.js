/* globals console */
"use strict";

const express = require("express");
const config = require("./config/config");
let app = express();

let port = config.port;

require("./config/express")(config, app);
require("./config/route")(app);

app.listen(port, () => {
	console.log(`Our app is running on http://localhost:${port}`);
});