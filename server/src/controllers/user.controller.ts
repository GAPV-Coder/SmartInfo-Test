import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    static async getAllUsers(req: Request, res: Response) {
        try {
            const currentUser = req.user as { role: string, name: string };
            console.log('Current user: ', currentUser)

            if (currentUser.role === 'Admin') {
                const users = await UserService.getAllUsers(currentUser.role);
                console.log('Users', users)
                if (users) {
                    return res.status(200).json({ users });
                } else {
                    return res.status(500).json({ message: 'Error fetching users' });
                }
            } else if (currentUser.role === 'User') {
                const users = await UserService.getUsersByRole(currentUser.role);
                console.log('Users', users)
                if (users) {
                    return res.status(200).json({ users });
                } else {
                    return res.status(500).json({ message: 'Error fetching users' });
                }
            } else {
                return res.status(403).json({ message: 'Access denied' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching users' });
        }
    }
}