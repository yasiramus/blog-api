import { Router } from "express";

/**controllers */
import refreshToken from "@/controllers/v1/auth/refresh_token";
import register from '@/controllers/v1/auth/register';
import login from '@/controllers/v1/auth/login';

/**middleware */
import validationError from "@/middleware/validationError";

/**validator */
import { loginValidation, refreshTokenValidation, registerValidation } from "@/validators/authValidators";

/**router */
const router = Router();

/**methods */
router.post('/register', registerValidation, validationError, register);

router.post('/login', loginValidation, validationError, login)

router.post('/refresh-token', refreshTokenValidation, validationError, refreshToken)

export default router