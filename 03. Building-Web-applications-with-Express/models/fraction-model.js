"use strict";

const mongoose = require("mongoose"),
	Schema = mongoose.Schema();

let fractionSchema = new Schema({
	name: {
		type: String,
		minlength: 3,
		maxlength: 30,
		required: true,
		unique: true,
		dropDups: true
	},
	alignment: {
		type: String,
		enum: ["good", "evil", "neutral"]
	},
	planets: [{type: Schema.Types.ObjectId, ref: "Planet"}],
	superheroes: [{type: Schema.Types.ObjectId, ref: "Superhero"}]
});

let Fraction;
mongoose.model("Fraction", fractionSchema);
Fraction = mongoose.model("Fraction");
module.exports = Fraction;