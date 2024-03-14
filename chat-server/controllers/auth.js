const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const crypto = require("crypto");

const mailService = require("../services/mailer");

//Model
const User = require("../models/user");
const filterObj = require("../utils/filterObj");
const { promisify } = require("util");

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

// Register New User
exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "password",
    "email"
  );

  //check if a verified user with given email exists

  const existing_user = await User.findOne({ email: email });
  if (existing_user && existing_user.verified) {
    // user with this email already exists, Please login
    res.status(400).json({
      status: "error",
      message: "Email already in use, Please Login.",
    });
  } else if (existing_user) {
    // if not verified than update prev one
    await User.findOneAndUpdate({ email: email }, filteredBody, {
      new: true,
      validateModifiedOnly: true,
    });

    // generate an otp and send to email
    req.userId = existing_user._id;
    next();
  } else {
    // if user is not available in DB
    const new_user = await User.create(filteredBody);

    // generate an otp and send to email
    req.userId = new_user._id;
    next();
  }
};

exports.sendOTP = async (req, res, next) => {
  const { userId } = req;
  console.log(userId, "userId");
  const new_otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const otp_expiry_time = Date.now() + 10 * 60 * 1000; // 10 Mins after otp is sent

  await User.findByIdAndUpdate(userId, {
    otp: new_otp,
    otp_expiry_time: otp_expiry_time,
  });

  // TODO send mail

  mailService.sendEmail({
    sender: "artvision1807@gmail.com",
    recipient: "akshita.2507.sharma@gmail.com",
    subject: "OTP for Tawk",
    text: `Your OTP is ${new_otp}. This is valid for 10 Mins.`,
  });

  res.status(200).json({
    status: "success",
    message: "OTP Sent Successfully!",
  });
};

exports.verifyOTP = async (req, res, next) => {
  // verify OTP and update user accordingly

  const { email, otp } = req.body;
  console.log(otp);
  const user = await User.findOne({
    email,
    otp_expiry_time: { $gt: Date.now() },
  });
  console.log(user);
  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "Email is invalid or OTP expired",
    });
  }

  if (!(await user.correctOTP(otp, user.otp))) {
    return res.status(400).json({
      status: "error",
      message: "OTP is incorrect",
    });
  }

  // OTP is correct
  console.log(user.otp);
  user.verified = true;
  user.otp = undefined;

  await user.save({ new: true, validateModifiedOnly: true });

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "OTP verified Successfully!",
    token,
    user_id: user._id,
  });
};

exports.login = async (req, res, next) => {
  //

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Both email and password are required",
    });
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(400).json({
      status: "error",
      message: "Email is incorrect",
    });
  }

  const token = signToken(user._id);

  return res.status(200).json({
    status: "success",
    message: "Logged in Successfully",
    token,
  });
};

exports.protect = async (req, res, next) => {
  // 1) Getting token (JWT) and check if it's there

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    req.status(400).json({
      status: "error",
      message: "You are not logged in. Please log in to get access",
    });
  }

  // 2) Verification of token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists

  const this_user = await User.findById(decoded.userId);

  if (!this_user) {
    res.status(400).json({
      status: "error",
      message: "The user belonging to this token does no longer exists.",
    });
  }

  // 4) Check if user changed password after the token was issued

  if (this_user.changedPasswordAfter(decoded.iat)) {
    res.status(400).json({
      status: "error",
      message: "User recently changed password! Please log in again.",
    });
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = this_user;
  next();
};

// Types of routes -> Protected(Only logged in users can access these)

exports.forgotPassword = async (req, res, next) => {
  // 1. Get Users email

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).json({
      status: "error",
      message: "There is no user with email address.",
    });

    return;
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `http://localhost:3000/auth/reset-password?code=${resetToken}`;

  // 3) Send it to user's email
  try {
    // TODO => Send Email with this Reset URL to user's email address
    mailService.sendEmail({
      from: "shreyanshshah242@gmail.com",
      to: user.email,
      subject: "Reset Password",
    });
    console.log(resetToken);
    res.status(200).json({
      status: "success",
      message: "Reset Password link sent to email!",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      status: "error",
      message: "There was an error sending the email. Try again later!",
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  // 1) Get user based on the token

  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    res.status(400).json({
      status: "error",
      message: "Token is Invalid or Expired",
    });

    return;
  }

  // 3) Update users password and set resetToken & expiry to undefined
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // 4) Log the user in, send JWT

  // TODO => send an email to user informing about password reset

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Password Reset Successful",
    token,
  });
};
