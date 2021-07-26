const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/Users');

// Post Request for register
router.post('/register', async (req, res) => {
    try {
        // Generate the salted password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a New User
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // Store the user
        const savedUser = await newUser.save();
        res.status(200).json(savedUser._id);
    } catch (err) {
	console.log(err);
        res.status(500).json(err);
    }
});

// Post Request for login
router.post('/login', async (req, res) => {
    try {
        //Check for the Username
        const user = await User.findOne({username:req.body.username});
        !user && res.status(400).json("Wrong Username or Password");

        //Check for Password
        const validPass = await bcrypt.compare(req.body.password, user.password);
        !validPass && res.status(400).json("Wrong Username or Password");

        //Send the response
        res.status(200).json({ _id: user._id, username: user.username });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
