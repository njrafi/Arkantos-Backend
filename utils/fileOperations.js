const path = require("path");
const fs = require("fs");
exports.writeServiceJsonFile = (code, language) => {
	console.log("Writing Service json to file");
    const content = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    console.log(content)
	const filepath = path.join(__dirname, "..", "serviceAccountKey.json");
	return new Promise((resolve, reject) => {
		fs.writeFile(filepath, content, (err) => {
			if (err) reject(err);
			console.log("Writing Service json to file successful");
			resolve("Writing Service json to file successful");
		});
	});
};
