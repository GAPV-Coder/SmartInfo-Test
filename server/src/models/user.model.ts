import { Model, DataTypes, Sequelize, Dialect } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config()

const database = process.env.POSTGRESQL_ADDON_DB || '';
const username = process.env.POSTGRESQL_ADDON_USER || '';
const password = process.env.POSTGRESQL_ADDON_PASSWORD;
const host = process.env.POSTGRESQL_ADDON_HOST;
const dialect = process.env.DB_DIALECT;
const port = process.env.POSTGRESQL_ADDON_PORT;

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: dialect as Dialect,
    port: Number(port),
});

export interface UserAttributes {
    id: string;
    email: string;
    password: string;
    repeatPassword: string;
    name: string;
    biography: string;
    telephone: string;
    gender: 'Male' | 'Female' | 'Other';
    role: 'Admin' | 'User';
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: string;
    public email!: string;
    public password!: string;
    public repeatPassword!: string;
    public name!: string;
    public biography!: string;
    public telephone!: string;
    public gender!: 'Male' | 'Female' | 'Other';
    public role!: 'Admin' | 'User';

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4(),
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        repeatPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        biography: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender: {
            type: DataTypes.ENUM('Male', 'Female', 'Other'),
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM('Admin', 'User'),
            allowNull: false,
            defaultValue: 'User',
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    }
);

export default User;

