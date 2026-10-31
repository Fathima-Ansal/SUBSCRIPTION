import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth.middleware.js';
import { requireStaffOrAdmin } from '../../middleware/role.middleware.js';
import { successResponse } from '../../utils/response.js';

const router = Router();
router.use(authenticateToken);
router.use(requireStaffOrAdmin);

router.get('/', (req, res) => {
  return successResponse(res, 'Products module ready for business schema implementation', {
    module: 'Products',
    status: 'Ready for Stage 2',
    authorizedRole: req.user.role,
  });
});

export default router;
