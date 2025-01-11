import express from 'express';
import * as userService from '../services/userService.js';

export const registerUser = async (req, res) => {
    try{
        const user = await userService.registerUser(req.body);
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const result = await userService.loginUser(email, password); 
        res.status(200).json(result);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

export const getUserProfile = async (req, res) => {
    try{
        const userId = req.params.id;
        const user = await userService.getUserProfile(userId);
        res.status(200).json(user);
    }catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const updateUserProfile = async (req, res) => {
    try{
        const userId = req.params.id;
        const user = await userService.updateUserProfile(userId, req.body);
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

export const deleteUser = async (req, res ) => {
    try{
        const userId = req.params.id;
        const result = await userService.deleteUser(userId);
        res.status(200).json(result, { message: 'User deleted successfully' });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}
export const logoutUser = async (req, res) => {
    try{
        res.status(200).json({ message: "Logout successfully" });
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}