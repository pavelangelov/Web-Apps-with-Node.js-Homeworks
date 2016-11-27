"use strict";

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

let powerSchema = new Schema({
	name: {
		type: String,
		minlength: 3,
		maxlength: 35,
		required: true,
		unique: true,
		dropDups: true
	}
});

let Power;
mongoose.model("Power", powerSchema);
Power = mongoose.model("Power");
module.exports = Power;