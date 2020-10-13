const { request } = require("express");
const User = require("../models/user");
const firebase = require("../utils/firebase");

const updatePicture = async (newPicture, imageName) => {
	const downloadUrl = await firebase.uploadImage(newPicture, imageName);
	console.log(downloadUrl);
	return downloadUrl;
};

const updateProfile = async (req, res, next) => {
	const { token, name, email, photoUrl, providerId } = req.body;
	try {
		const user = await User.findOne({ token: token });
		if (!user) {
			return res.status(401).json({
				message: "No User found",
			});
		}

		const imageName = "hudai/gg2";
		if (
			photoUrl != undefined &&
			photoUrl.length > 0 &&
			photoUrl != user.photoUrl
		) {
			const newPicture = photoUrl;
			user.photoUrl = await updatePicture(newPicture, imageName);
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

module.exports = { updatePicture, updateProfile };
