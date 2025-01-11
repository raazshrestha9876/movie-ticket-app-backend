import session from "express-session";

const googleSession = session({
    secret: process.env.SESSION_SECRET, // Secret key to sign session ID cookie, ensuring data integrity.
    resave: false, // Avoid saving session if not modified, improving performance.
    saveUninitialized: true, // Create a session even if it hasn't been modified (for new users).
})

export default googleSession;