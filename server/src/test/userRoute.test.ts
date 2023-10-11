import request from 'supertest';
import { app } from '../index';
import User from '../models/user.model';
import { expect } from '@jest/globals';
import { UserAttributes } from '../models/user.model';

describe('User Route', () => {
    describe('GET /users/:id', () => {
        describe('GET /users/:id', () => {

            let user: User;

            before(async () => {
                user = await User.create({
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    password: 'password',
                    repeatPassword: 'password',
                    biography: 'mybiography',
                    telephone: '+123456789',
                    gender: 'Male',
                    role: "Admin"
                } as UserAttributes);
            });

            it('should return a user by id', async () => {
                const res = await request(app).get(`/users/${user.id}`);
                expect(res.status).toBe(200);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: user.name,
                        email: user.email,
                    })
                );
            });

            it('should return 404 if user is not found', async () => {
                const res = await request(app).get('/users/123456789012');
                expect(res.status).toBe(404);
            });
        });
    });
});
