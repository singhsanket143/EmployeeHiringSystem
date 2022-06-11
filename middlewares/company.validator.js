const validateCreateCompany = (req, res, next) => {
    if(!req.body.name) {
        return res.status(400).json({
            message: 'Invalid arguments',
            success: false,
            data: {}
        });
    }
    next();
}

module.exports = {
    validateCreateCompany
}