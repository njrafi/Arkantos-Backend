const User = require("../models/user");

exports.update = async (req, res, next) => {
	const { token, name, email, photoUrl, providerId } = req.body;
	try {
		const user = await User.findOne({ token: token });
		if (!user) {
			return res.status(401).json({
				message: "No User found",
			});
		}

		user.name = name;
		user.email = email;
		user.photoUrl = photoUrl;
		user.providerId = providerId;
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