const admin = require("firebase-admin");
const stream = require("stream");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: "arkantos-1.appspot.com/",
});

const bucket = admin.storage().bucket();

exports.uploadImage = async (base64EndcodedImageString, imageName) => {
	console.log("Uploading image to firebase storage");
	var bufferStream = new stream.PassThrough();
	bufferStream.end(Buffer.from(base64EndcodedImageString, "base64"));
	const file = bucket.file(`${imageName}.jpg`);
	const downloadUrl = await new Promise((resolve, reject) => {
		bufferStream
			.pipe(
				file.createWriteStream({
					metadata: {
						contentType: "image/jpeg",
					},
					public: true,
					validation: "md5",
				})
			)
			.on("error", function (err) {
				//console.log("error from image upload", err);
				reject(err);
			})
			.on("finish", async function () {
				// The file upload is complete.
				const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
				console.log("File Upload Complete", publicUrl);
				resolve(publicUrl);
			});
	});
	return downloadUrl;
};

exports.deleteFileWithPrefix = async (prefix) => {
	let files = await bucket.getFiles();
	let dirFiles = files[0].filter((f) => f.name.includes(prefix + "/"));
	let totalDeleted = dirFiles.length;
	dirFiles.forEach(async (file) => {
		await file.delete();
	});
	return totalDeleted;
};
