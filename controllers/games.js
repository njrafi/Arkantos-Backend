const User = require("../models/user");

exports.postFavoriteGames = async (req, res, next) => {
	const { userToken, favoriteGames } = req.body;
	try {
		const user = await User.findOne({ token: userToken });
		if (!user) {
			const response = {
				message: "User not found",
			};
			console.log(process.env.NODE_ENV === "production" ? "🎉" : response);
			return res.status(401).json(response);
		}

		user.favoriteGames = favoriteGames;
		await user.save();
		const response = {
			message: "Favorite Games Updates",
		};
		return res.status(200).json(response);
	} catch (err) {
		next(err);
		return err;
	}
};

exports.getFavoriteGames = async (req, res, next) => {
	const userToken = req.params.userToken;
	try {
		const user = await User.findOne({ token: userToken });
		if (!user) {
			const response = {
				message: "Invalid userToken",
			};
			console.log(process.env.NODE_ENV === "production" ? "🎉" : response);
			return res.status(401).json(response);
		}
		const response = {
			userToken: userToken,
			favoriteGames: user.favoriteGames,
		};
		console.log(
			process.env.NODE_ENV === "production"
				? "🎉"
				: "Get FavoriteGames Retrieved: ",
			user.favoriteGames.length
		);
		return res.status(200).json(response);
	} catch (err) {
		next(err);
		return err;
	}
};
