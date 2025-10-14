import { Router } from 'express';
import { param, body, query } from 'express-validator';

/**middleware */
import { authenticate } from '@/middleware/authenticate';
import validationError from '@/middleware/validationError';
import authorize from '@/middleware/authorize';

/**controller */
import getCurrentUser from '@/controllers/v1/user/current_user';

const router = Router();

router.get(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  getCurrentUser,
);

export default router;
