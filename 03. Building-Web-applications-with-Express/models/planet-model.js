"use strict";

const mongoose = require("mongoose"),
	Schema = mongoose.Schema();

let planetSchema = new Schema({
	name: {
		type: String,
		minlength: 3,
		maxlength: 30,
		required: true,
		unique: true,
		dropDups: true
	}
});

let Planet;
mongoose.model("Planet", planetSchema);
Planet = mongoose.model("Planet");
module.exports = Planet;