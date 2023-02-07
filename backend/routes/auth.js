const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult, header } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_token = "@s£j$j";
const fetchUser = require('../middleware/fetchuser')



router.post('/', [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        const securedPwd = await bcrypt.hash(req.body.password, salt)
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPwd
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwt_token);

        res.json(authToken);
    }
    catch (err) {
        console.log(err)
    }

})

router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authToken = jwt.sign(data, jwt_token);
                

                res.json(authToken)
            } else {
                res.json({ error: "incorrect password" })
            }
        } else {
            res.json({ error: "email not found" })
        }
    }
    catch (err) {
        console.log(err)
    }

})
router.post('/getuser',fetchUser, async (req, res) => {
    try {
        userId=req.user.id;
        const user= await User.findById(userId).select("password")
        res.send(user)
    }
    catch (err) {
        console.log(err)
    }

})


module.exports = router