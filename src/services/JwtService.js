const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
const genneralAccessToken = (payload) => {
    const access_token =jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, {expiresIn: '30s'})

    return access_token;
}

const genneralRefreshToken = (payload) => {
    const refresh_token =jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, {expiresIn: '365d'})

    return refresh_token;
}

const refreshTokenJwtService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(token);
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if(err) {
                    resolve({
                        status: 'ERR',
                        message: "The authentication",
                    })
                }
                // console.log(user);
                const access_token = await genneralAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: "Refresh token successfully",
                    access_token
                })
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService,
}
