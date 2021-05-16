import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import authController from '../controllers/user';
import validateRequest from '../middleware/validation-error';
import { currentUser } from '../middleware/current-user';
import { requireAuth } from '../middleware/require-auth';
import { ResponseMessageType } from '../utils';

const router = Router();

router.get('/currentuser', currentUser, requireAuth, (req: Request, res: Response, next: NextFunction) => {
  const currentUser = req.currentUser || null;
  res.send({
    status: currentUser ? ResponseMessageType.SUCCESS : ResponseMessageType.FAIL,
    data: { currentUser },
  });
});

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must be provided'),
  ],
  validateRequest,
  authController.signInHandler
);

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be with 4 and 20 characters'),
  ],
  validateRequest,
  authController.signUpHandler
);

router.post('/signout', (req: Request, res: Response, next: NextFunction) => {
  req.session = null;
  res.send({
    status: ResponseMessageType.SUCCESS,
  });
});

export default router;
