const {Company} = require('../models/index');

const createCompany = async (data) => {
    try {
        const company = await Company.create(data);
        return company;
    } catch (error) {
        console.log(error);
        return {
            error
        }
    }
}

const getCompany = async (companyId) => {
    try {
        const company = await Company.findByPk(companyId);
        return company;
    } catch(error) {
        console.log(error);
        return {
            error
        }
    }
}

const getCompanies = async () => {
    try {
        const companies = await Company.findAll();
        return companies;
    } catch (error) {
        console.log(error);
        return {
            error
        }
    }
}

const deleteCompany = async (id) => {
    try {
        const company = await Company.findByPk(id);
        company.destroy();
        return true;
    } catch (error) {
        console.log(error);
        return {
            error
        }
    }
}

module.exports = {
    createCompany,
    getCompany,
    getCompanies,
    deleteCompany
}