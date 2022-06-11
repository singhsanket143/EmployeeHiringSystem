const authController = require('../controllers/auth.controller');
const authValidator = require('../middlewares/auth.validator');

const routes = (app) => {
    app.post('/relevel/api/v1/signup',authValidator.validateSignup, authController.signup);
}

module.exports = routes;