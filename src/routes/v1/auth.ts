import { Router } from "express";

/**controllers */
import register from '@/controllers/v1/auth/register';
import login from '@/controllers/v1/auth/login';

/**middleware */
import validationError from "@/middleware/validationError";

/**validator */
import { loginValidation, registerValidation } from "@/validators/authValidators";

/**router */
const router = Router();

/**methods */
router.post('/register',
    registerValidation,
    validationError,
    register);

router.post('/login', loginValidation, validationError, login)

export default router;