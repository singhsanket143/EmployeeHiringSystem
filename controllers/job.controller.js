const jobService = require('../services/job.services');

const serverError = {
    message: 'Something went wrong',
    success: false,
    data: {}
}

const createJob = async (req, res) => {
    const response = await jobService.createJob(req.body);
    if(response.error) {
        return res.status(500).json(serverError);
    }
    return res.status(201).json({
        message: 'Successfully created the job',
        success: true,
        data: response
    })
}

const getAllJobs = async (req, res) => {
    response = await jobService.getAllJobs(req.query.companyId);
    if(!response) {
        return res.status(500).json(serverError);
    }
    if(response.error) {
        serverError.message = response.error;
        return res.status(404).json(serverError);
    }
    return res.status(200).json({
        message: 'Successfully fetched all the jobs',
        success: true,
        data: response
    })
}

const getJob = async (req, res) => {
    const response = await jobService.getJob(req.params.id);
    if(!response) {
        return res.status(500).json(serverError);
    }
    if(response.error) {
        serverError.message = response.error;
        return res.status(404).json(serverError);
    }
    return res.status(200).json({
        message: 'Successfully fetched the job',
        success: true,
        data: response
    })
}

const applyToJob = async (req, res) => {
    const response = await jobService.applyToJob({
        userId: req.user,
        jobId: req.body.jobId
    });
    if(!response) {
        return res.status(500).json(serverError);
    }
    if(response.error) {
        serverError.message = response.error;
        return res.status(400).json(serverError);
    }
    return res.status(200).json({
        message: 'Successfully applied to the job',
        success: true,
        data: response
    });
}

module.exports = {
    createJob,
    getAllJobs,
    getJob,
    applyToJob
}