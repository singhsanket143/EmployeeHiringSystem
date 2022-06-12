const authController = require('../controllers/auth.controller');
const authValidator = require('../middlewares/auth.validator');
const jobValidator = require('../middlewares/job.validator');
const routes = (app) => {
    app.post('/relevel/api/v1/signup',authValidator.validateAuth, authController.signup);
    app.post('/relevel/api/v1/signin',authValidator.validateAuth, authController.signin);
    app.patch(
        '/relevel/api/v1/user/:role', 
        authValidator.isAuthenticated,
        jobValidator.isAdmin,
        authController.updateRole
    )
}

module.exports = routes;