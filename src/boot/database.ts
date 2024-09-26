import './config';
import mongoose from 'mongoose';
import Echo from '../helpers/Echo';

export default {
    connect: async function () {
        const databaseURI = process.env.DATABASE_URI ?? null;
        if (databaseURI !== null) {
            Echo.green('Connecting to mongodb..');
            mongoose.set('strictQuery', true);
            await mongoose.connect(databaseURI);
            Echo.green(`Connected to database.`);
        } else {
            const error = 'Database not configured';
            Echo.red(error);
            throw error;
        }
    },

    disconnect: async function () {
        await mongoose.disconnect();
    }
};
