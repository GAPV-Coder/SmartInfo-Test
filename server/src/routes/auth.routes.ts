import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user registration and login.
 */

/**
 * @swagger
 * /auth/create:
 *   post:
 *     summary: New user registration.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's e-mail address. Must be unique.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User password.
 *                 example: mypassword
 *               repeatPassword:
 *                 type: string
 *                 description: Repeat password for confirmation.
 *                 example: mypassword
 *               name:
 *                 type: string
 *                 description: User name.
 *                 example: John Doe
 *               biography:
 *                 type: string
 *                 description: User biography.
 *                 example: User's description.
 *               telephone:
 *                 type: string
 *                 description: User's phone number.
 *                 example: +1234567890
 *               gender:
 *                 type: string
 *                 description: User's gender.
 *                 example: Male
 *               role:
 *                 type: string
 *                 description: User Role. It can be "Admin" or "User".
 *                 example: User
 *     responses:
 *       200:
 *         description: User successfully registered.
 *       400:
 *         description: Error in input data.
 */
router.post('/create', AuthController.registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login of a registered user.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Registered user email.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User password.
 *                 example: mypassword
 *     responses:
 *       200:
 *         description: Successful login. An access token is provided.
 *       401:
 *         description: Incorrect login credentials.
 *       500:
 *         description: Server error.
 */
router.post('/login', AuthController.loginUser);

export default router;
