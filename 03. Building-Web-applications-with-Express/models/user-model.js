"use strict";

const mongoose = require("mongoose"),
	Schema = mongoose.Schema();

let userSchema = new Schema({
	username: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 20
	},
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 20
	},
	image: String
});

let User;
mongoose.model("User", userSchema);
User = mongoose.model("User"); 
module.exports = User;