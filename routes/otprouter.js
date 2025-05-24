const express = require("express");
const generateOTP = require("../utils/generateOTP");
const sendMail = require("../utils/sendMail");
const otprouter = express.Router();

let otpStore = {}; // Temporary, use Redis/DB in production

// otprouter.post("/send-otp", async (req, res) => {
//   const { email } = req.body;
//   if (!email) return res.status(400).json({ message: "Email is required" });

//   const otp = generateOTP();
//   otpStore[email] = otp;

//   const subject = "Your OTP for Signup Verification";
//   const html = `<h2>Your OTP is: <strong>${otp}</strong></h2><p>Valid for 5 minutes.</p>`;

//   try {
//     await sendMail(email, subject, html);
//     res.json({ message: "OTP sent successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to send OTP", error: err.message });
//   }
// });

// otprouter.post("/verify-otp", (req, res) => {
//   const { email, otp } = req.body;
//   if (otpStore[email] === otp) {
//     delete otpStore[email];
//     res.json({ verified: true });
//   } else {
//     res.status(400).json({ verified: false, message: "Invalid OTP" });
//   }
// });

// otprouter.post("/send-otp", async (req, res) => {
//   const { email } = req.body;
//   const otp = generateOTP();

//   try {
//     await sendMail(email, "Your OTP Code", `<h3>Your OTP is: ${otp}</h3>`);
//     otpStore.set(email, otp); // store OTP for later verification
//     res.json({ success: true, message: "OTP sent successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Failed to send OTP", error: err });
//   }
// });

otprouter.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = generateOTP();
  otpStore[email] = otp;  // Correct way for plain object

  const subject = "Your OTP for Signup Verification";
  const html = `<h2>Your OTP is: <strong>${otp}</strong></h2><p>Valid for 5 minutes.</p>`;

  try {
    await sendMail(email, subject, html);
    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Mail Error:", err);
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
});


module.exports = otprouter;
