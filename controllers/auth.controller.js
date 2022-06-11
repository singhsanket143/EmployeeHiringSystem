const authService = require('../services/auth.services');

const serverError = {
    message: 'Something went wrong',
    success: false,
    data: {}
}

const signup = async (req, res) => {
    const response = await authService.signup(req.body);
    if (!response) {
        return res.status(500).json(serverError);
    }
    if(response.error) {
        return res.status(400).json({
            message: response.error,
            success: false,
            data: {},
            err: response.details
        })
    }
    return res.status(200).json({
        message: 'Successfully signed up',
        success: true,
        data: response
    });
}

module.exports = {
    signup
}