"use strict";

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

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
	planets: [{}],
	superheroes: [{}]
});
fractionSchema.pre("save", true, function (next, done) {
	let self = this;
	mongoose.models["Fraction"].findOne({ name: self.name }, function (err, fraction) {
		if (err) {
			done(err);
		} else if (fraction) {
			self.invalidate("name", "name must be unique");
			done(new Error("name must be unique"));
		} else {
			done();
		}
	});
	next();
});

let Fraction;
mongoose.model("Fraction", fractionSchema);
Fraction = mongoose.model("Fraction");
module.exports = Fraction;