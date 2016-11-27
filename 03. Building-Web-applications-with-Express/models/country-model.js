"use strict";

const mongoose = require("mongoose"),
	Schema = mongoose.Schema();

let countrySchema = new Schema({
	name: {
		type: String,
		minlength: 3,
		maxlength: 30,
		required: true,
		unique: true,
		dropDups: true
	},
	planet: { type: Schema.Types.ObjectId, ref: "Planet" }
});

let Country;
mongoose.model("Country", countrySchema);
Country = mongoose.model("country");
module.exports = Country;