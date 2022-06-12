const {Role} = require('../models/index');

const getAdminRole = async () => {
    try {
        const role = await Role.findOne({
            where: {
                name: 'admin'
            }
        })
        return role;
    } catch (error) {
        console.log(error);
    }
}

const getCompanyRole = async () => {
    try {
        const role = await Role.findOne({
            where: {
                name: 'company'
            }
        })
        return role;
    } catch (error) {
        console.log(error);
    }
}

const getStudentRole = async () => {
    try {
        const role = await Role.findOne({
            where: {
                name: 'student'
            }
        })
        return role;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAdminRole,
    getCompanyRole,
    getStudentRole
}