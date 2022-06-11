const authController = require('../controllers/auth.controller');
const authValidator = require('../middlewares/auth.validator');

const routes = (app) => {
    app.post('/relevel/api/v1/signup',authValidator.validateAuth, authController.signup);
    app.post('/relevel/api/v1/signin',authValidator.validateAuth, authController.signin);
}

module.exports = routes;