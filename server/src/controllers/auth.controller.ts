import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import User from "../models/user.model";

export class AuthController {
    static async registerUser(req: Request, res: Response) {
        try {
            const {
                email,
                password,
                repeatPassword,
                name,
                biography,
                telephone,
                gender,
                role,
            } = req.body;
            const existingUser = await User.findOne({ where: { email } });

            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: "User already registered" });
            }

            const token = await AuthService.registerUser({
                email,
                password,
                repeatPassword,
                name,
                biography,
                telephone,
                gender,
                role,
            });

            if (token) {
                return res.status(201).json({
                    message: "User successfully registered",
                    token,
                    userData: {
                        email,
                        name,
                        biography,
                        telephone,
                        gender,
                        role,
                    },
                });
            } else {
                return res
                    .status(500)
                    .json({ message: "Error registering user" });
            }
        } catch (error) {
            console.error("Error when registering the user:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const loginResponse = await AuthService.loginUser(email, password);

            if (loginResponse) {
                const [greeting, token] = loginResponse.split("\nToken: ");

                return res.status(200).json({
                    message: "Login successful",
                    greeting,
                    token,
                });
            } else {
                return res.status(401).json({ message: "Login failed" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Error logging in" });
        }
    }
}
