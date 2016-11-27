"use strict";

const mongoose = require("mongoose"),
	Schema = mongoose.Schema();

let superheroSchema = new Schema({
	name: {
		type: String,
		minlength: 3,
		maxlength: 60,
		required: true
	},
	secretIdentity: {
		type: String,
		minlength: 3,
		maxlength: 20,
		required: true,
		unique: true,
		dropDups: true
	},
	alignment: {
		type: String,
		enum: ["good", "evil", "neutral"]
	},
	story: {
		type: String,
		minlength: 1,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	fractions: [{ type: Schema.Types.ObjectId, ref: "Fraction" }],
	powers: [ {type: Schema.Types.ObjectId, ref: "Power"} ]
});

let Superhero;
mongoose.model("Superhero", superheroSchema);
Superhero = mongoose.model("Superhero");
module.exports = Superhero;