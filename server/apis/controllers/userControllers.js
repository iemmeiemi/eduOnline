const service = require("../services/userServices");
const { handleResponse } = require('../utils/responseFormat');
const { validateEmail } = require('../utils/validate'); // Import hàm validate


const getAllUsers = async (req, res) => {
    try {
        const response = await service.getAllUsers();
        handleResponse(res, response);
    } catch (error) {
        handleResponse(res, null, error.message, 500);
    }
};

const getOneUserById = async (req, res) => {
    try {
        const _id = req.param.id;
        const { id } = req.decoded.id;
        let response;
        if( _id == id ) {
            response = await service.getOneUserByIdFromOther(_id);
        } else {
            response = await service.getOneUserByIdFromOwner(_id);
        }

        handleResponse(res, response, 'Created');
    } catch (error) {
        handleResponse(res, null, error.message, 500);
    }
};

const getOneUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) {
            return handleResponse(res, null, "Email is required", 400);
        }
        if (!validateEmail(email)) {
            return handleResponse(res, null, "Invalid email format", 400);
        }

        const response = await service.getOneUserByEmail(email);
        handleResponse(res, response);
    } catch (error) {
        handleResponse(res, null, error.message, 500);
    }
};

const updateUser = async (req, res) => {
    try {
        const user = req.body.user;
        const response = await service.updateUser(user);

        handleResponse(res, response, 'Updated');
    } catch (error) {
        handleResponse(res, null, error.message, 500);
    }
};


const updateRoleUser = async (req, res) => {
    try {
        const user = req.body.user;
        const role = req.param.role;
        const accesser = req.decoded._id;
        if(user._id !== accesser) {
            handleResponse(res, null, 'Forbiddent access', 400);
        }
        const response = await service.updateUser({user, role});
        handleResponse(res, response, 'Updated');
    } catch (error) {
        handleResponse(res, null, error.message, 500);
    }
};


//admin func
const banUser = async (req, res) => {
    try {
        const id = req.param.id;
        const response = await service.banUser(id);

        handleResponse(res, response, 'Banned');
    } catch (error) {
        handleResponse(res, null, error.message, 500);
    }
};


module.exports = {
    getOneUserByEmail,
    getAllUsers,
    getOneUserById,
    updateRoleUser,
    updateUser,
    banUser,

};
