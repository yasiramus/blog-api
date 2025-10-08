import { Router } from "express";

/**controllers */
import register from '@/controllers/v1/auth/register';

/**middleware */
import validationError from "@/middleware/validationError";

/**validator */
import { registerValidation } from "@/validators/authValidators";

/**router */
const router = Router();

/**methods */
router.post('/register',
    registerValidation,
    validationError,
    register);

export default router;