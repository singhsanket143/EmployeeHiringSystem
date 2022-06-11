const validateSignup = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Invalid arguments',
            success: false,
            data: {}
        });
    }
    next();
}


module.exports = {
    validateSignup
}