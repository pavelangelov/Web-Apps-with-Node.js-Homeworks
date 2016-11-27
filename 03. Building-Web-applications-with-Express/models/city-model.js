"use strict";

const mongoose = require("mongoose"),
	Schema = mongoose.Schema();

let citySchema = new Schema({
	name: {
		type: String,
		minlength: 3,
		maxlength: 30,
		required: true,
		unique: true,
		dropDups: true
	},
	country: {type: Schema.Types.ObjectId, ref: "Country"}
});

let City;
mongoose.model("City", citySchema);
City = mongoose.model("City");
module.exports = City;