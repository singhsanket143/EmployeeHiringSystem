const {Job, User} = require('../models/index');

const createJob = async (data) => {
    try {
        const job = await Job.create(data);
        return job;
    } catch (error) {
        console.log(error);
        return {error}
    }
}

const getAllJobs = async (company) => {
    try {
        let jobs;
        if(company) {
            jobs = await Job.findAll({
                where: {
                    companyId: company
                }
            });
            return jobs;
        }
        jobs = await Job.findAll();
        if(!jobs) {
            return {error: 'No job found'}
        }
        return jobs;
    } catch (error) {
        console.log(error);
    }
}

const getJob = async (id) => {
    try {
        const job = await Job.findByPk(id);
        if(!job) {
            return {error: 'No job found'}
        }
        return job;
    } catch (error) {
        console.log(error);
    }
}

const applyToJob = async (data) => {
    try {
        const user = await User.findByPk(data.userId);
        if(!user) {
            return {
                error: 'No user found by the given id'
            }
        }
        const job = await Job.findByPk(data.jobId);
        if(!job || job.status != 'active') {
            return {
                error: 'Job that you are applying to is currently not available'
            }
        }
        if(await user.hasJob(job)) {
            return {
                error: 'Job application is already submitted'
            }
        }
        await user.addJob(job);
        return true;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createJob,
    getAllJobs,
    getJob,
    applyToJob
}