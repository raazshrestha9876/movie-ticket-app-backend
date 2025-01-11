import { User } from "../models/User.js";

//Serialize user information into the session
export const serializeUser = ((user, done) => {
    done(null, user.id); // Store only the user ID in the session
});

//Deserialize user information from the session
export const deserializeUser = (async (id, done) => {
    try {
        // Retrieve the full user object using the user ID stored in the session
        const user = await User.findById(id);
        if (user) {
            done(null, user); // Attach the user object to req.user
        } else {
            done(new Error('User not found'), false); // Handle cases where user is not found
        }
    } catch (error) {
        console.error('Error deserializing user:', error);
        done(error, false); // In case of an error, return false to indicate failure
    }
});
