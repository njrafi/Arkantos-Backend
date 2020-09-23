const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
const cors = require("cors");

const errorMiddlewares = require("./middlewares/errors");

const authRoutes = require("./routes/auth");

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Register routes here
// Dummy route
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
	res.json({
		message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
	});
});

app.use(errorMiddlewares.notFound);
app.use(errorMiddlewares.errorHandler);

const mongoDbUri = process.env.MONGO_DB_URI;

mongoose
	.connect(mongoDbUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => {
		console.log("connected to mongoDb Database");
		console.log("server started at port " + process.env.PORT || 4000);
		app.listen(process.env.PORT || 4000);
	})
	.catch((err) => console.log(err));
