import { app } from './index';
import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';
import './models/user.model';

dotenv.config();

// Database
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

async function connectToDatabase() {
        try {
                await sequelize.sync();
                console.log('Connection has been established successfully.');
            } catch (error) {
                console.error('Unable to connect to the database:', error);
            }
}

connectToDatabase();

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
