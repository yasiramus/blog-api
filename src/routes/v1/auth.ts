import { Router } from "express";

/**controllers */
import register from '@/controllers/v1/auth/register';

/**router */
const router = Router();

/**methods */
router.post('/register', register);

export default router;