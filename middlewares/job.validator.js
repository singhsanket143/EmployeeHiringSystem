const authService = require('../services/auth.services');
const roleService = require('../services/role.services');

const validateCreateJob = (req, res, next) => {
    if(!req.body.title || !req.body.description || !req.body.companyId) {
        return res.status(400).json({
            message: 'invalid arguments, title, company or description missing',
            suceess: false,
            data: {}
        })
    }
    next();
}

const validateApplyJob = (req, res, next) => {
    if(!req.body.jobId) {
        return res.status(400).json({
            message: 'invalid arguments, job id missing',
            suceess: false,
            data: {}
        })
    }
    next();
}

const isCompanyOrAdmin = async (req, res, next) => {
    const user = await authService.getUserById(req.user);
    const adminRole = await roleService.getAdminRole();
    const companyRole = await roleService.getCompanyRole();
    if(!(await user.hasRole(adminRole) || await user.hasRole(companyRole))) {
        return res.status(401).json({
            success: false,
            data: {},
            message: 'You are not authorized to create a job'
        })
    }
    next();
}

const isAdmin = async (req, res, next) => {
    const user = await authService.getUserById(req.user);
    const adminRole = await roleService.getAdminRole();
    console.log('roles', await user.getRoles());
    if(!(await user.hasRole(adminRole))) {
        return res.status(401).json({
            success: false,
            data: {},
            message: 'You are not authorized'
        })
    }
    next();
}

module.exports = {
    validateCreateJob,
    validateApplyJob,
    isCompanyOrAdmin,
    isAdmin
}