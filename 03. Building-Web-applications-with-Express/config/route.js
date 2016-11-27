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
			res.render("user-details", { username });
		})
		.get("/users/:username/superheroes", (req, res) => {
			let username = req.params.username;
			userController.getUserSuperheroes(username)
				.then(superheroes => {
					console.log(superheroes);
					res.render("user-superheroes", { username, superheroes });
				});
		})
		.get("/users/:username/fractions", (req, res) => {

		})
		.get("/users/:username/add-new-superhero", (req, res) => {
			let username = req.params.username;
			res.render("add-new-superhero", { username });
		})
		.post("/users/:username/add-new-superhero", (req, res) => {
			let username = req.params.username;
			let name = req.body.superheroName,
				secretIdentity = req.body.secretIdentity,
				alignment = req.body.alignment,
				story = req.body.story,
				image = req.body.image,
				powers = req.body.powers.split(",")
				.map(power => {
					return { name: power };
				}),
				fractions = req.body.fractions.split(",")
									.map(fr => {
										return {name: fr};
									});
			console.log(req.body.fractions);
			console.log(req.body.powers);

			console.log("Fractions: " + fractions);
			console.log("Powers: " + powers);

			userController.addNewSuperHero(username, name, secretIdentity, alignment, story, image, fractions, powers);
			res.redirect(`/users/${username}/superheroes`);
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