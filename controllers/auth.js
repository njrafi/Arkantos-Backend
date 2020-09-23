const User = require("../models/user");

exports.postLogin = async (req, res, next) => {
	const { token, name, email, photoUrl, providerId } = req.body;
	try {
		const user = await User.findOne({ token: token });
		if (user) {
			return res.status(200).json({
				message: "Login Successfull",
				user: user,
			});
		}

		const newUser = new User({
			token: token,
			name: name,
			email: email,
			photoUrl: photoUrl,
			providerId: providerId,
		});

		await newUser.save();

		return res.status(200).json({
			message: "SignUp Successful",
			user: newUser,
		});
	} catch (err) {
		next(err);
		return err;
	}
};

exports.updateUser = async (req, res, next) => {
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
