const companyController = require('../controllers/company.controller');
const authValidator = require('../middlewares/auth.validator');
const companyValidator = require('../middlewares/company.validator');

const routes = (app) => {
    app.post(
        '/relevel/api/v1/company',
        authValidator.isAuthenticated, 
        companyValidator.validateCreateCompany,
        companyController.createCompany
    );
    app.get('/relevel/api/v1/company',authValidator.isAuthenticated, companyController.getCompanies);
    app.get('/relevel/api/v1/company/:id',authValidator.isAuthenticated, companyController.getCompany);
    app.delete('/relevel/api/v1/company/:id',authValidator.isAuthenticated, companyController.deleteCompany);
}

module.exports = routes;