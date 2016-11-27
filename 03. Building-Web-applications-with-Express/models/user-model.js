"use strict";

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

let userSchema = new Schema({
	username: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 20,
	},
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 20
	},
	image: String
});

userSchema.pre("save", true, function (next, done) {
	let self = this;
	mongoose.models["User"].findOne({ username: self.username }, function (err, user) {
		if (err) {
			done(err);
		} else if (user) {
			self.invalidate("username", "username must be unique");
			done(new Error("username must be unique"));
		} else {
			done();
		}
	});
	next();
});

let User;
mongoose.model("User", userSchema);
User = mongoose.model("User");
module.exports = User;