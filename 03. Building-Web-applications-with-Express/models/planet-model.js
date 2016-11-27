"use strict";

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

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
planetSchema.pre("save", true, function (next, done) {
	let self = this;
	mongoose.models["Planet"].findOne({ name: self.name }, function (err, planet) {
		if (err) {
			done(err);
		} else if (planet) {
			self.invalidate("name", "name must be unique");
			done(new Error("name must be unique"));
		} else {
			done();
		}
	});
	next();
});
let Planet;
mongoose.model("Planet", planetSchema);
Planet = mongoose.model("Planet");
module.exports = Planet;