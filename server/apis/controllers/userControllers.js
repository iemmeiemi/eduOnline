const service = require("../services/userServices");
const { handleResponse } = require('../utils/responseFormat');

const createUser = async (req, res) => {
    try {
        const user = req.body.user;
        const response = await service.createUser(user);

        handleResponse(res, response, 'Created');
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

const updateUser = async (req, res) => {
    try {
        const user = req.body.user;
        const response = await service.updateUser(user);

        handleResponse(res, response, 'Updated');
    } catch (error) {
        handleResponse(res, null, error.message, 500);
    }
};

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
    createUser,
    getOneUserById,

    updateUser,
    banUser,

};
