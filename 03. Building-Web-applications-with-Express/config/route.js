"use strict";

const userController = require("../models").Users; 

module.exports = (app) => {
	app.get("/", (req, res) => {
		res.render("index");
	})
	.get("/login", (req, res) => {
		userController.getUserByUsername(req.query.username)
			.then(user => {
				if (!user) {
					res.send("<h3>This username doesn`t exist!</h3>");
					return;
				}

				res.render("user-home", user);
			})
			.catch(err => console.log("Error: " + err));
	})
	.post("/register", (req, res) => {
		let username = req.body.username,
			name = req.body.name,
			image = req.body.image;

		userController.createUser(username, name, image)
			.then(() => {
				res.send("<h2>Successfuly registered user!");
			})
			.catch(err => console.log("Error: ", err));
	})
	.get("/logout", (req, res) => {
		res.redirect("/");
	})
	.get("/users/:username/details", (req, res) => {
		let username = req.params.username;
		res.render("user-details", {username});
	})
	.post("/update/user/:username", (req, res) => {
		let username = req.params.username,
			name = req.body.name,
			image = req.body.image;
		
		userController.updateUserInfo(username, name, image)
			.then(console.log);
		res.redirect(`/login?username=${username}`);
	});
};