const service = require("../services/authService");
const { handleResponse } = require('../utils/responseFormat');
const { validateEmail } = require('../utils/validate'); // Import hàm validate


const register = async (req, res) => {
    try {
        const user = req.body.user;
        if (!user || !user.email) {
            return handleResponse(res, "Invalid data provided", 400);
        }
        const data = { user }
        const response = await service.register(data);

        handleResponse(res, response, 'Created');
    } catch (error) {
        handleResponse(res, null, error.message, 500);
    }
};

const registerGoogle = async (req, res) => {
    try {
        const user = req.body;
        if (!user || !user.email) {
            return handleResponse(res, "Invalid data provided", 400);
        }
        const data = { user }
        const response = await service.registerGoogle(data);

        handleResponse(res, response, 'Created');
    } catch (error) {
        handleResponse(res, null, error.message, 500);
    }
};

const refreshAccessToken = async (req, res) => {
    try {
        console.log("haha");
        const { email } = req.body;
        console.log(email);
        if (!email) {
            return handleResponse(res, null, "Email is required", 400);
        }
        if (!validateEmail(email)) {
            return handleResponse(res, null, "Invalid email format", 400);
        }
        const data = { email };
        const response = await service.refreshAccessToken(data);
        //console.log(response.useruser);
        handleResponse(res, response, 'Token refreshed successfully', 200);
    } catch (error) {
        handleResponse(res, null, error.message, 500);
    }
};


module.exports = {
    register,
    refreshAccessToken,
    registerGoogle,

};