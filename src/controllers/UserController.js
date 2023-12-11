const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email)
        if(!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }else if(!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }else if(password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is not equal confirm password'
            })
        }
        const response = await UserService.createUser(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email)
        if(!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }else if(!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }
        const response = await UserService.loginUser(req.body);
        const {refresh_token, ...newResponse} = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
        })
        return res.status(200).json({...newReponse, refresh_token})
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.updateUser(userId, data);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.deleteUser(userId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.getDetailsUser(userId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const refreshToken = async (req, res) => {
    // console.log('req.cookies.refresh_token',req.cookies.refresh_token);
    try {
        // const token = req.cookies.refresh_token
        let token = req.headers.token.split(' ')[1]
        if(!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const logOutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })
        
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await UserService.deleteManyUser(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logOutUser,
    deleteMany,
}