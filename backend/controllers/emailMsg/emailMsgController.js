const expressAsyncHandler = require("express-async-handler");
const Filter = require("bad-words");
const nodemailer = require("nodemailer");
const { sendMailHelper } = require("../../utils/sendMailHelper");
const EmailMsg = require("../../model/EmailMessaging/EmailMessaging");
require("dotenv").config();

const sendEmailMsgController = expressAsyncHandler(async (req, res) => {
	try {
        //build up message
		const { to, subject, message } = req.body;
		console.log(req.body,"tfghkjl;'")
		const msg = {
			to,
			from: process.env.EMAIL,
			subject,
			message,
			sentBy: req?.user?._id,
		};

		const resData = await sendMailHelper(msg);
		//save to our db
		await EmailMsg.create({
			sentBy: req?.user?._id,
			from: req?.user?.email,
			to,
			message,
			subject,
		});
    res.json(resData);

	} catch (error) {
		res.json(error);
	}
});
module.exports ={ sendEmailMsgController}