const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser) {
                resolve({
                    status: 'ERR', 
                    message: 'The email is already'
                })
            }  
            const hashPassword = bcrypt.hashSync(password, 10)  // băm mk 10 lần
            const createdUser = await User.create({
                name,
                email,
                password: hashPassword,
                phone
            })
            if(createdUser) {
                resolve({
                    status: 'OK',
                    message: "SUCCESS",
                    data: createdUser
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const {  email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(!checkUser) {
                resolve({
                    status: 'ERROR', 
                    message: 'The user is not defined'
                })
            } 
            
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if(!comparePassword) {
                resolve({
                    status: 'ERROR', 
                    message: 'The password or user is incorrect'
                })
            }
            const access_token =  await genneralAccessToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin,
            })

            const refresh_token =  await genneralRefreshToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin,
            })

            console.log("access_token", access_token)
            resolve({
                status: 'OK',
                message: "SUCCESS",
                access_token,
                refresh_token,
            })
        } catch (error) {
            reject(error);
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({_id: id});
            if(!checkUser) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            const updateUser = await User.findByIdAndUpdate(id, data, {new: true})

            console.log(updateUser);

            resolve({
                status: 'OK',
                message: "SUCCESS",
                data: updateUser
            })
        } catch (error) {
            reject(error);
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({_id: id});
            if(!checkUser) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            await User.findByIdAndDelete(id)

            console.log(updateUser);

            resolve({
                status: 'OK',
                message: "Delete user successfully",
            })
        } catch (error) {
            reject(error);
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();

            resolve({
                status: 'OK',
                message: "Get user successfully",
                data: allUser
            })
        } catch (error) {
            reject(error);
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({_id: id});
            console.log('user-----', user);
            if(!user) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: "Get details user successfully",
                data: user
            })
        } catch (error) {
            reject(error);
        }
    })
}

const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            await User.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteManyUser,
}