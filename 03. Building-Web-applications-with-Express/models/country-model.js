"use strict";

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

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
countrySchema.pre("save", true, function (next, done) {
	let self = this;
	mongoose.models["Country"].findOne({ name: self.name }, function (err, country) {
		if (err) {
			done(err);
		} else if (country) {
			self.invalidate("name", "name must be unique");
			done(new Error("name must be unique"));
		} else {
			done();
		}
	});
	next();
});
let Country;
mongoose.model("Country", countrySchema);
Country = mongoose.model("Country");
module.exports = Country;