import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { userRoute } from "./routes/userRoute.js";
import { movieRoute } from "./routes/movieRoute.js";
import { bookingRoute } from "./routes/bookingRoute.js";
import { showRoute } from "./routes/showRoute.js";
import { reviewRoute } from "./routes/reviewRoute.js";
import passport from "passport";
import googleStrategy from "./config/googleStrategy.js";
import googleSession from "./config/googleSession.js";
import { serializeUser, deserializeUser } from "./config/passport.js";
import { googleAuthRoute } from "./routes/googleAuthRoute.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

//Middleware for session handling
app.use(googleSession);

//Initialize Passport for authentication handling
app.use(passport.initialize()); // Initializes Passport to handle authentication requests (login/signup).
app.use(passport.session()); // Manages session to track user authentication state across requests.

//middleware for googleStrategy
passport.use(googleStrategy);

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.use("/api/auth", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/show", showRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/review", reviewRoute);
app.use("/auth/google", googleAuthRoute)

app.get('/dashboard', (req, res) => {
  res.status(200).json({ message: "Dasboard for users successfully" });
})

export default app;
