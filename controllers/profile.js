const User = require("../models/user");

exports.updateProfile = async (req, res, next) => {
	const { token, name, email, newPhoto, providerId } = req.body;
	try {
		const user = await User.findOne({ token: token });
		if (!user) {
			return res.status(401).json({
				message: "No User found",
			});
        }
        
        if(newPhoto != user.photoUrl) {
            user.photoUrl = await updatePicture(newPhoto)
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

const updatePicture = async (picture) => {

}