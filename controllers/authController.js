const User = require('../models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const {v4: uuidv4 } = require('uuid');
const { registerSchema } = require('../validations/authValidation.js');

module.exports = {

    createUser: async (req, res) => {

        // information stored on the request body

        const { error } = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const {username, email, password, phone, address, userType} = req.body;

        const hash = await bcrypt.hash(password, 10);


        try {

            const newUser = new User({
                username,
                uid: uuidv4(),
                email,
                password: hash,
                phone,
                address,
                userType
            });

            // save the user to the database

            await newUser.save();

            // return a success message

            return res.status(201).json({message: 'User created successfully'});


        } catch (error) {
            console.log('Error creating user', error);
            return res.status(500).json({message: 'Error creating user'});
        }


    },
   

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email }, { __v: 0, updatedAt: 0, createdAt: 0, email: 0 });
            if (!user) {
                return res.status(401).json("Wrong credentials");
            }

            const decryptedpassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET);
            const decrypted = decryptedpassword.toString(CryptoJs.enc.Utf8);

            if (decrypted !== req.body.password) {
                return res.status(401).json("Wrong credentials");
            }

            const userToken = jwt.sign({
                id: user._id,
                userType: user.userType,
                email: user.email,
            }, process.env.JWT_SECRET, { expiresIn: '21d' });

            return res.status(200).json({ userToken, userType: user.userType, email: user.email, id: user._id });
        } catch (error) {
            console.error('Error logging in user:', error);
            return res.status(500).json("Internal Server Error");
        }
    }
}
