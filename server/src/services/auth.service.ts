import { HashingPasswordHelper } from "../helpers/hashingPassword";
import { JwtHelper } from "../helpers/jwt";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const expire = process.env.JWT_EXPIRES_IN;

export class AuthService {
    static async registerUser(userData: any): Promise<string | null> {
        try {
            const hashPassword = await HashingPasswordHelper.hashPassword(
                userData.password,
            );

            const newUser = await User.create({
                ...userData,
                password: hashPassword,
                repeatPassword: hashPassword,
            });

            const token = JwtHelper.generateToken(
                { userId: newUser.id },
                secret ?? 'default_secret',
                expire ?? 'default_expire',
            );

            return token;
        } catch (err) {
            console.log("Error registering user", err);
            throw new Error("Error during user registration");
        }
    }

    static async loginUser(
        email: string,
        password: string,
    ): Promise<string | null> {
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return "User not found";
            }

            const passwordMatch = await HashingPasswordHelper.comparePassword(
                password,
                user.password,
            );

            if (!passwordMatch) {
                return "Incorrect password";
            }

            let greetingMessage = "";
            if (user.role === "Admin") {
                greetingMessage = `Hello ${user.name}, you are a user ${user.role}!`;
            } else if (user.role === "User") {
                greetingMessage = `Hello ${user.name}, you are just ${user.role}!`;
            }

            // const token = JwtHelper.generateToken(
            //     { email: user.email },
            //     secret ?? 'default_secret',
            //     expire ?? 'default_expire',
            // );
            const token = jwt.sign(
                {
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                secret ?? 'default_secret',
                { expiresIn: expire ?? 'default_expire' }
            );

            return `${greetingMessage}\nToken: ${token}`;
        } catch (err) {
            console.log("Error logging in", err);
            return null;
        }
    }
}
