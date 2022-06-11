const companyService = require('../services/company.services');

const serverError = {
    message: 'Something went wrong',
    success: false,
    data: {}
}

const createCompany = async (req, res) => {
    console.log("hit")
    const response = await companyService.createCompany(req.body);
    if(!response) {
        return res.status(500).json(serverError);
    }
    if(response.error) {
        serverError.message = response.error.errors[0].message;
        return res.status(500).json(serverError);
    }
    return res.status(201).json({
        message: 'Successfully created company',
        data: response,
        success: true
    })
}

const getCompany = async (req, res) => {
    const response = await companyService.getCompany(req.params.id);
    if(!response) {
        serverError.message = 'Not able to find company'
        return res.status(404).json(serverError);
    }
    if(response.error) {
        return res.status(500).json(serverError);
    }
    return res.status(200).json({
        message: 'Successfully fetched company',
        data: response,
        success: true
    })
}

const getCompanies = async (req, res) => {
    const response = await companyService.getCompanies();
    if(!response) {
        serverError.message = 'Not able to find company'
        return res.status(404).json(serverError);
    }
    if(response.error) {
        return res.status(500).json(serverError);
    }
    return res.status(200).json({
        message: 'Successfully fetched companies',
        data: response,
        success: true
    })
}

const deleteCompany = async (req, res) => {
    const response = await companyService.deleteCompany(req.params.id);
    if(!response || response.error) {
        return res.status(500).json(serverError);
    }
    return res.status(200).json({
        message: 'Successfully fetched companies',
        data: response,
        success: true
    })
}

module.exports = {
    createCompany,
    getCompany,
    getCompanies,
    deleteCompany
}
