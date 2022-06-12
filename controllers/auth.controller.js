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

const signin = async (req, res) => {
    const user = await authService.getUserByEmail(req.body.email);
    if(!user) {
        return res.status(404).json({
            success: false,
            message: 'No user found by the email',
            data: {}
        })
    }
    if(user.error) {
        console.log(user.error);
        return res.status(500).json(serverError);
    }
    console.log(authService.checkPassword(req.body.password, user.password), user.password, req.body.password)
    if(!authService.checkPassword(req.body.password, user.password)) {
        return res.status(400).json({
            message: 'Incorrect password',
            data: {},
            success: false
        })
    }
    const token = authService.createToken({id: user.id, email: user.email});
    if(!token) {
        return res.status(500).json(serverError);
    }
    return res.status(200).json({
        message: 'Successfully signed in',
        success: true,
        data: token
    })
}

const updateRole = async (req, res) => {
    const user = await authService.getUserByEmail(req.body.email);
    const response = await authService.updateUserRole(req.params.role, user.id);
    if(!response) {
        return res.status(500).json(serverError);
    }
    return res.status(200).json({
        message: 'successfully updated the',
        data: response,
        success: true
    })
}

module.exports = {
    signup,
    signin,
    updateRole
}