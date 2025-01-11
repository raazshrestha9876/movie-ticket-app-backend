import express from "express";
import { validationResult } from "express-validator";

export const validateRequest = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ message: "Invalid request", errors: errors.array() });
        
    }
    next();
}