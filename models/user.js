const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	token: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: false,
	},
	photoUrl: {
		type: String,
		required: false,
	},
	providerId: {
		type: Number,
		required: false,
	},
});

module.exports = mongoose.model("User", userSchema);