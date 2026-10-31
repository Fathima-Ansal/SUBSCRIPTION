import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth.middleware.js';
import { successResponse } from '../../utils/response.js';

const router = Router();
router.use(authenticateToken);

router.get('/', (req, res) => {
  return successResponse(res, 'Invoices module ready for business schema implementation', {
    module: 'Invoices',
    status: 'Ready for Stage 2',
    userRole: req.user.role,
  });
});

export default router;
