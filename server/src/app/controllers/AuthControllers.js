const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
class AuthController {

    //@route POST /api/auth/register
    //@desc Register user
    //@access public
    async register(req, res, next) {
        const {username, password} = req.body;

        if (!username || !password) 
            return res.status(400).json({ success: false, message: 'Missing username or password' });
        try {
            //Check for  exist user
            const user = await User.findOne({ username });
            if (user)
                return res.status(400).json({ success: false, message: 'Username already used' });
            //All good
            const hashedPassword = await argon2.hash(password);
            const newUser = new User({ 
                    username,
                    password: hashedPassword 
                });
            
            await newUser.save();
            // Return token
            const accessToken = jwt.sign( { userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ success: true, message: 'Register account successfully', accessToken });
        }catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: 'Internal server error'});
        }

    }

    //@route POST /api/auth/login
    //@desc Login user
    //@access public

    async login(req, res) {
        const {username, password} = req.body;
        if (!username || !password) 
            return res.status(400).json({ success: false, message: 'Missing username or password' });
        try {
            //Check for  exist user
            const user = await User.findOne({ username });
            if (!user)
                return res.status(400).json({ success: false, message: 'Incorrect username' });
            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid) {
                return res.status(400).json({ success: false, message: 'Incorrect password' });
            }
            // Return token
            const accessToken = jwt.sign( { userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ success: true, message: 'Login successfully', accessToken });

        } catch(error) {
            console.log(err);
            res.status(500).json({ success: false, message: 'Internal server error'});
        }
    }
}

module.exports = new AuthController();
