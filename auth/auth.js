const jsonwebtoken = require("jsonwebtoken")

const authVerify = async(req, res, next) => {
    try {
        const header = req.header.authoryzation;
        if (header == null) {
            return res.status(402).json({
                message: "missing token",
                err: null
            });
        }
        let token = header.split("")[1];
        const SECRET_KEY = "secretcode";

        let decodeToken;
        try {
            decodeToken = await jsonwebtoken.verify(token, SECRET_KEY);
        } catch (error) {
            if (rror instanceof jsonwebtoken.TokenExpiredError) {
                return res.status(401).json({
                    message: "token expired",
                    err: error
                });
            }
            return res.status(401).json({
                message: "invalid token",
                err: error
            });
        }
        req.userData = decodeToken;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Error",
            err: error
        });
    }
}

module.exports = { authVerify };