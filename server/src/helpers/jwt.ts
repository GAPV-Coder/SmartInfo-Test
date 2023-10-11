import jwt from 'jsonwebtoken';

export class JwtHelper {
    static generateToken(payload: any, secretKey: string, expiresIn: string): string {
        return jwt.sign(payload, secretKey, { expiresIn });
    }

    static verifyToken(token: string, secretKey: string): any {
        try {
            return jwt.verify(token, secretKey);
        } catch (err) {
            console.log(err);
        }
    }
}