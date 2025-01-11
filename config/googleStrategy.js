import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/User.js";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Step 3: Check if the user already exists in the database
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        // If user exists, pass the user object to done (indicating success)
        return done(null, user);
      }

      // Step 4: Create a new user if they do not exist
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0]?.value,
      });

      await user.save();

      // Return the newly created user
      return done(null, user);
    } catch (error) {
      // Handle any errors during user creation or lookup
      console.error("Error during Google authentication:", error);
      return done(error, false);
    }
  }
);

export default googleStrategy;
