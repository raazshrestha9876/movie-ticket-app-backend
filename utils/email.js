import nodemailer from 'nodemailer';
import { emailConfig } from '../config/email.js';

const transporter = nodemailer.createTransport(emailConfig);

export const sendEmail = async(to, subject, text, html) => {
    try{
        await transporter.sendMail({
            from: emailConfig.auth.user,
            to,
            subject,
            text,
            html,
        })
    }catch(error){
        throw new Error('Email notification failed');
    }
}