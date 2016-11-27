"use strict";

const User = require("./user-model");
const Superhero = require("./superhero-model");
const Fraction = require("./fraction-model");
const City = require("./city-model");
const Country = require("./country-model");
const Planet = require("./planet-model");
const Power = require("./power-model");

module.exports.Users = {
	createUser(username, name, image) {
		let user = new User({ username, name, image });
		return Promise.resolve()
			.then(() => {
				user.save((err) => {
					if (err) {
						throw new Error(err);
					}
					return user;
				});
			});
	},
	getUserByUsername(username) {
		let user = User.findOne({ "username": username });

		return Promise.resolve()
			.then(() => {
				return user;
			});
	},
	updateUserInfo(username, name, image) {
		let update = {};
		if (name.length > 0) {
			update["name"] = name;
		}

		if (image.length > 0) {
			update["image"] = image;
		}

		if (update.name || update.image) {
			return Promise.resolve()
				.then(() => {
					User.findOneAndUpdate({ "username": username }, update, (err, user) => {
						if (err) {
							throw new Error(err);
						}
						return user;
					});
				});
		}
	},
	getUserSuperheroes(username) {
		return new Promise((resolve, reject) => {
			User.findOne({ "username": username }, "superheroes", (err, user) => {
				if (err) {
					return reject(err);
				}
				console.log("User int query " + user);
				resolve(user.superheroes);
			});
		});

	},
	addNewSuperHero(username, name, secretIdentity, alignment, story, image, fractionsToAdd, powersToAdd) {
		let powers = powersToAdd.forEach(p => new Power({ name: p.name }));
		let fractions = fractionsToAdd.forEach(fr => new Fraction({ name: fr.name }));
		let superhero = new Superhero({ name, secretIdentity, alignment, story, image, fractions, powers });
		User.findOneAndUpdate({ "username": username }, { $push: { "superheroes": superhero } }, (err, user) => {
			if (err) {
				throw new Error(err);
			}

			console.log(user);
		});
	}
};