const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_token = "@s£j$j";
const fetchUser = (req, res, next) => {
    const token = req.header("auths")
    if (!token) {
        res.send({ error: "sahi daal na bc" })
    }
    try {
        const stri = jwt.verify(token, jwt_token)
        req.user = stri.user
        next()
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = fetchUser