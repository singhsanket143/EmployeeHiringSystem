const authService = require('../services/auth.services');

const validateAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Invalid arguments',
            success: false,
            data: {}
        });
    }
    next();
}

const isAuthenticated = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(400).json({
            message: 'JWT token missing',
            success: false,
            data: {}
        });
    }
    const response = authService.verifyToken(token);
    if(!response) {
        return res.status(401).json({
            message: 'Invalid auth token',
            success: false,
            data: {}
        })
    }
    const user = await authService.getUserById(response.id);
    if(!user) {
        return res.status(404).json({
            message: 'Auth token sent for an invalid user',
            success: false,
            data: {}
        });
    }
    req.user = user.id;
    next();
}


module.exports = {
    validateAuth,
    isAuthenticated
}