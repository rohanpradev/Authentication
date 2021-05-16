import { NextFunction, Request, Response } from 'express';
import User from '../../models/user_model';
import { catchAsync, JWTToken, ResponseMessageType } from '../../utils';

/**
 * @method signUpController
 * @description
 * This method is used to sign up to this application.
 *
 * @see
 * It requires an email and a password to be provided
 *
 * @param req Request of the API
 * @param res Response of the API
 * @param next Next function
 */
export const signUpHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Extract email and password from request
  const { email, password } = req.body;
  // create a new user and save it to DB
  const user = await User.createUser({ email, password }).save();
  // Create JWT and send a cookie
  const jwt = JWTToken.createToken({ id: user.id });
  // Store it in session object and send the cookie
  req.session = { jwt };

  res.status(201).send({
    status: ResponseMessageType.SUCCESS,
    data: { user },
  });
});
