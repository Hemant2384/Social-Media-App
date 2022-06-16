const User = require('../../models/Users');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {validateRegisterInput,validateLoginInput} = require('../../util/validate')
const { SECRET_KEY } = require('../../config');
const {UserInputError} = require('apollo-server')

function generateToken(user){
     return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    },SECRET_KEY,{
        expiresIn : '1h'
    });
}

module.exports = {
    Mutation: {
        async register(_,{registerInput : {username,email,password,confirmPassword}}){
            const {valid, errors} =validateRegisterInput(username,email,password,confirmPassword)
            if(!valid){
                throw new UserInputError('Errors',{errors})
            }
            const user = await User.findOne({username})
            if(user){
                throw new UserInputError('Username is taken',{
                    errors : {
                        username: 'This username is taken'
                    }
                })
            }
            password = await bcrypt.hash(password,12)
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })
            const res = await newUser.save();
            const token = generateToken(res)
            return {
                ...res._doc,
                id: res._id,
                token
            }
        },
        async login(_,{username,password}){
            const user = await User.findOne({username});
            const {valid, errors} =validateLoginInput(username,password)
            if(!valid){
                throw new UserInputError('Errors',{errors})
            }
            if(!user){
                errors.general = 'User Not found';
                throw new UserInputError('User Not found',{errors})
            }
            const match = await bcrypt.compare(password,user.password)
            if(!match){
                errors.general = 'User Not found';
                throw new UserInputError('Wrong Credentials',{errors})
            }
            const token = generateToken(user)
            return {
                ...user._doc,
                id: user._id,
                token
            }
        }
    }
};