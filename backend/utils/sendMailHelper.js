const expressAsyncHandler = require('express-async-handler')
require("dotenv").config();
const Filter = require("bad-words");
const nodemailer = require("nodemailer");
const fs = require('fs');

let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
});

const sendMailHelper = (msg) => {
	return new Promise((resolve, reject) => {
		const { to, from, subject, message, sentBy } = msg;
		// Get the message
		const emailMessage = subject + " " + message;
		// Prevent profanity /bad words
		const filter = new Filter();
		const isProfane = filter.isProfane(emailMessage);
		if (isProfane) {
			let err = "Email sent failed ,because it contain profane words";
			reject(err);
		} else {
			let mailOptions = {
				to,
				from,
				subject,
				text: message,
			};
			// send msg
			transporter.sendMail(mailOptions, function (err, data) {
				if (err) {
					console.log("Error Occurs", err);
					reject(err);
				} else {
					console.log("Email sent", data);
					resolve(data);
				}
			});
		}
	});
};

module.exports = {
	sendMailHelper,
};