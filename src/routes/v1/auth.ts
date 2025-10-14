import { Router } from 'express';

/**controllers */
import refreshToken from '@/controllers/v1/auth/refresh_token';
import register from '@/controllers/v1/auth/register';
import logout from '@/controllers/v1/auth/logout';
import login from '@/controllers/v1/auth/login';

/**middleware */
import validationError from '@/middleware/validationError';
import { authenticate } from '@/middleware/authenticate';

/**validator */
import {
  loginValidation,
  refreshTokenValidation,
  registerValidation,
} from '@/validators/authValidators';

/**router */
const router = Router();

/**methods */
router.post('/register', registerValidation, validationError, register);

router.post('/login', loginValidation, validationError, login);

router.post(
  '/refresh-token',
  refreshTokenValidation,
  validationError,
  refreshToken,
);

router.post('/logout', authenticate, logout);

export default router;
