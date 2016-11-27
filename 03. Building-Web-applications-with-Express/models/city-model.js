"use strict";

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

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
citySchema.pre("save", true, function (next, done) {
	let self = this;
	mongoose.models["City"].findOne({ name: self.name }, function (err, city) {
		if (err) {
			done(err);
		} else if (city) {
			self.invalidate("name", "name must be unique");
			done(new Error("name must be unique"));
		} else {
			done();
		}
	});
	next();
});

let City;
mongoose.model("City", citySchema);
City = mongoose.model("City");
module.exports = City;