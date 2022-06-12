const {User} = require('../models/index');
const roleService = require('./role.services');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const signup = async (data) => {
    try {
        const user = await User.create(data);
        const studentRole = await roleService.getStudentRole();
        user.addRole(studentRole);
        return user;
    } catch (err) {
        console.log(err);
        if(err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') {
            return {
                error: err.message,
                details: err.errors[0].message
            }
        }
    }
}

const getUserByEmail = async (userEmail) => {
    try {
        const user = await User.findOne({
            where: {
                email: userEmail
            }
        });
        return user;
    } catch (err) {
        console.log(err);
        return {
            error: err.message
        }
    }
}

const checkPassword = (userPass, encryptPass) => {
    return bcrypt.compareSync(userPass, encryptPass);
}

const createToken = (user) => {
    try {
        return jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: '2 days'
        })
    } catch (err) {
        console.log(err);
    }
}

const verifyToken = (token) => {
    try {
        const response = jwt.verify(token, process.env.JWT_SECRET);
        return response;
    } catch (err) {
        console.log(err);
    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        return user;
    } catch (err) {
        console.log(err);
    }
}

const updateUserRole = async (role, id) => {
    try {
        const user = await User.findByPk(id);
        if (role == 'admin') {
            await user.addRole(await roleService.getAdminRole());
        } else if (role == 'company') {
            await user.addRole(await roleService.getCompanyRole());
        }
        return user;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    signup,
    getUserByEmail,
    checkPassword,
    createToken,
    verifyToken,
    getUserById,
    updateUserRole
}