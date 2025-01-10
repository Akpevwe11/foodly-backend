const User = require('../models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const {v4: uuidv4 } = require('uuid');

module.exports = {
    createUser: async (req, res) =>  {


        const user = req.body; 

        // Validate user and userResponse 
       

        try {

            await admin.auth().getUserByEmail(user.email);

            res.status(400).json({status: false, message: "Email already exist"})

        } catch (error) {

            if (error.code === 'auth/user-not-found'){
                try {

                    const firebaseUser = await admin.auth().createUser({
                        email: user.email, 
                        password: user.password,
                        emailVerified: false, 
                        disabled: false
                    })

                    console.log(firebaseUser.uid);

                    // Extract uid from the firebaseUser response
                    const uid = firebaseUser.uid; 

                    if (!uid) {
                        return res.status(400).json({error:"invalid uid"})
                    }



                
                     const newUser = new User({
                       username: user.username, 
                        email: user.email, 
                        password: CryptoJs.AES.encrypt(user.password, process.env.SECRET).toString(),
                        uid: firebaseUser.uid, 
                         userType: 'Client'
                     });
                    await newUser.save()

                    
                
                    res.status(201).json({status: true, message: 'User created successfully'})
        
                } catch (error) {
                    console.error('Error creating user:', error);
                    res.status(500).json({status: false, error: "Error creating user"})

                }
            }

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
