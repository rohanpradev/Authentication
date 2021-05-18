import { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from '@sgticketing/common';
import User from '../../models/user_model';
import { catchAsync, JWTToken, Password, ResponseMessageType } from '../../utils';

/**
 * @method signInHandler
 * @description
 * This method is used to sign in to this application
 *
 * @see
 * It requires an email and a password to be provided
 *
 * @param req Request of the API
 * @param res Response of the API
 * @param next Next function
 */
export const signInHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Extract email and password from request
  const { email, password } = req.body;
  // check for existing user
  const existingUser = await User.findOne({ email });
  // Failed to find user check
  if (!existingUser) return next(new NotAuthorizedError('Invalid credentials'));
  // Compare the password provided
  const passwordsMatch = await Password.compare(existingUser?.password, password);
  // Invalid password check
  if (!passwordsMatch) return next(new NotAuthorizedError('Invalid credentials'));
  // Create JWT and send a cookie
  req.session = {
    jwt: JWTToken.createToken({ id: existingUser.id }),
  };

  res.status(200).send({ status: ResponseMessageType.SUCCESS, data: { user: existingUser } });
});
