import regnewUserService from "../services/service.user.js";
import GmcError from "../utils/GmcError.js";

export const registerUser = async (req, res, next) => {
  try {
    //pass the body data directly to the service
    const result = await regnewUserService(req.body);
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: result.newUser
    });
  } catch (error) {
    //verify that the error is an instance of GmcError class
    if (error instanceof GmcError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }
    //pass unexpected errors to Express error handler
    next(error);
  }
};
