import dotenv from 'dotenv';

dotenv.config();

export const emailConfig = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
}