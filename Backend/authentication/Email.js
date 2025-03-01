const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const User = require("../Models/User");


dotenv.config();

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// const otp = generateOTP();
let otps = {};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",

  auth: {
    user: process.env.USERMAIL,
    pass: process.env.USERPASS,
  },
});

//..............................Send Email.....................................
const Send = async (req, res) => {
  const email = req.body.email;
  const otp = generateOTP();
  const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutes from now

  otps[email] = { otp, expirationTime };

  const mailOptions = {
    from: process.env.SENDERMAIL,
    to: email,
    subject: "OTP Verification Email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; text-align: center;">
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="#"> <img src="https://i.ibb.co/rG9G1zfx/Abhyudaya.png" alt="Abhyudaya" style="user-select: none; width: 150px; margin-bottom: 20px;"></a>
        </div>
        <h2 style="color: #333; margin-bottom: 20px;">OTP Verification Email</h2>
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
          Dear User,
        </p>
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
          Thank you for registering with AlphaLearn. To complete your registration, please use the following OTP (One-Time Password) to verify your account:
        </p>
        <p style="color: #333; font-size: 2.0em; font-weight: bold; margin-bottom: 20px;">
          ${otp}
        </p>
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
          This OTP is valid for 10 minutes. If you did not request this verification, please disregard this email. Once your account is verified, you will have access to our services and its features.
        </p>
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
          If you have any questions or need assistance, please feel free to reach out to us. We are here to help!
        </p>
      </div>
    `,
  };

  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (user)
      return res.status(403).json({ message: "Email Atready Exists !" });

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    res.status(200).send("OTP sent successfully.");
  } catch (error) {
    res.status(400).json({ message: "Error : " + error });
  }
};

//..........................Verify.......................................

const Verify = (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  const record = otps[email];

  if (!record) {
    return res.status(400).json({ message: "No OTP found for this email." });
  }

  const { otp: storedOtp, expirationTime } = record;

  if (Date.now() > expirationTime) {
    delete otps[email]; // Clean up expired OTP
    return res.status(400).json({ message: "OTP has expired." });
  }

  if (storedOtp === otp) {
    delete otps[email]; // Clean up used OTP
    return res.status(200).json({ message: "OTP verified successfully." });
  } else {
    return res.status(400).json({ message: "Invalid OTP." });
  }
};

module.exports = { Send, Verify };
