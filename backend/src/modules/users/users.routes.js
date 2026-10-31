import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth.middleware.js';
import { requireAdmin } from '../../middleware/role.middleware.js';
import { successResponse } from '../../utils/response.js';

const router = Router();

router.use(authenticateToken);
router.use(requireAdmin);

router.get('/', (req, res) => {
  return successResponse(res, 'Users module ready for business schema implementation', {
    module: 'Users',
    status: 'Ready for Stage 2',
    authorizedRole: req.user.role,
  });
});

export default router;
