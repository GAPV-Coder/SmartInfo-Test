import bcrypt from 'bcrypt';

export class HashingPasswordHelper {
    static async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
    }
    
    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
        return isPasswordMatching;
    }
}