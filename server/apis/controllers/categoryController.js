const service = require("../services/categoryService");
const { handleResponse } = require('../utils/responseFormat');


const getAllCategory = async (req, res) => {
    try {
        const response = await service.getAllCategory();
        handleResponse(res, response);
    } catch (error) {
        console.error(error);
        handleResponse(res, null, error.message || "Internal server error", 500);
    }
};

module.exports = {
    getAllCategory,


}