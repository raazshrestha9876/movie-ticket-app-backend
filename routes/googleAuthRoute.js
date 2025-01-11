import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));
  
router.get('/callback', passport.authenticate('google', {
    failureRedirect: 'api/auth/login',
    successRedirect: '/dashboard' 
}));

export { router as googleAuthRoute };