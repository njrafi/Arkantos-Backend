const { request } = require("express");
const User = require("../models/user");
const firebase = require("../utils/firebase");
const shortHash = require("short-hash");

const updateProfile = async (req, res, next) => {
	const { token, name, email, photoUrl, providerId } = req.body;
	try {
		const user = await User.findOne({ token: token });
		if (!user) {
			return res.status(401).json({
				message: "No User found",
			});
		}

		if (
			photoUrl != undefined &&
			photoUrl.length > 0 &&
			photoUrl != user.photoUrl
		) {
			const newPicture = photoUrl;
			user.photoUrl = await updateProfilePicture(newPicture, token);
		}

		user.name = name;
		user.email = email;
		await user.save();

		return res.status(200).json({
			message: "User Update Successful",
			user: user,
		});
	} catch (err) {
		next(err);
		return err;
	}
};

const updateProfilePicture = async (newPicture, token) => {
	await firebase.deleteFileWithPrefix(shortHash(token));
	const imageName = shortHash(token) + "/" + Date.now();
	const downloadUrl = await firebase.uploadImage(newPicture, imageName);
	return downloadUrl;
};

module.exports = { updateProfilePicture, updateProfile };
