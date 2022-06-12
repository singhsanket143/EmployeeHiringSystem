const jobController = require('../controllers/job.controller');
const authValidator = require('../middlewares/auth.validator');
const jobValidator = require('../middlewares/job.validator');

const routes = (app) => {
    app.post(
        '/relevel/api/v1/job',
        authValidator.isAuthenticated, 
        jobValidator.isCompanyOrAdmin,
        jobValidator.validateCreateJob,
        jobController.createJob
    );
    app.get(
        '/relevel/api/v1/job',
        authValidator.isAuthenticated, 
        jobController.getAllJobs
    );
    app.get(
        '/relevel/api/v1/company/:id',
        authValidator.isAuthenticated, 
        jobController.getJob
    );
    app.post(
        '/relevel/api/v1/job/apply',
        authValidator.isAuthenticated, 
        jobController.applyToJob
    );
}

module.exports = routes;