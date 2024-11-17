const service = require("../services/userServices");
const { handleResponse } = require('./utils/responseUtils');

const createUser = async (req, res) => {
    try {
        const user = req.body.user;
        const response = await service.createUser(user);

        handleResponse(res, response, 'Created');
    } catch (error) {
        handleResponse(res, null, error.message, 500);
    }
};

module.exports = {
    createUser,
};
