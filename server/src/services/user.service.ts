import User from '../models/user.model';

export class UserService {
    static async getAllUsers(currentUserRole: string): Promise<User[] | null> {
        try {
            if (currentUserRole === 'Admin') {
                console.log('currentUserRole', currentUserRole)
                return await User.findAll();
            } else {
                return User.findAll();
            }
        } catch (error: any) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }

    static async getUsersByRole(role: string): Promise<User[] | null> {
        try {
            const users = await User.findAll({ where: { role } });
            return users;
        } catch (error: any) {
            throw new Error('Error fetching users'+ error.message);
            // return null;
        }
    }
}