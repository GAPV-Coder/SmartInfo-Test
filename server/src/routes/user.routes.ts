import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/authentication';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users or users with a specific role.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User list successfully obtained.
 *       403:
 *         description: Access denied.
 *       500:
 *         description: Error getting list of users.
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: User role to filter. Optional.
 *         example: User
 */
router.get('/users', authenticateToken, UserController.getAllUsers);

export default router;
