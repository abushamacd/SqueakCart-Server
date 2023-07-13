const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  loginUserService,
  refreshTokenService,
  changePasswordService,
  setRoleService,
  setRestrictionService,
  forgetPasswordService,
  resetPasswordService,
} = require("./auth.services");
const config = require("../../../src/config");

exports.loginUser = tryCatch(async (req, res) => {
  const result = await loginUserService(req.body);
  const { refreshToken, ...others } = result;

  // Set Refresh Token in Cookies
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendRes(res, {
    statusCode: 200,
    success: true,
    message: "User login successfully",
    data: others,
  });
});

exports.refreshToken = tryCatch(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await refreshTokenService(refreshToken);

  // Set Refresh Token in Cookies
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendRes(res, {
    statusCode: 200,
    success: true,
    message: "User login successfully",
    data: result,
  });
});

exports.changePassword = tryCatch(async (req, res) => {
  await changePasswordService(req.body, req.user);
  sendRes(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully !",
  });
});

exports.forgetPassword = tryCatch(async (req, res) => {
  const { email } = req.body;
  await forgetPasswordService(email);
  sendRes(res, {
    statusCode: 200,
    success: true,
    message: "Send reset token in you email successfully !",
  });
});

exports.resetPassword = tryCatch(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const result = await resetPasswordService(token, password);
  sendRes(res, {
    statusCode: 200,
    success: true,
    message: "Password reset successfully !",
    data: result,
  });
});

exports.setRole = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await setRoleService(id);
  sendRes(res, {
    statusCode: 200,
    success: true,
    message: "Admin make successfully !",
    data: result,
  });
});

exports.setRestriction = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await setRestrictionService(id);
  sendRes(res, {
    statusCode: 200,
    success: true,
    message: "Admin make successfully !",
    data: result,
  });
});
