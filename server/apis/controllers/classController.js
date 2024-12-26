const service = require('../services/classService');
const { handleResponse } = require('../utils/responseFormat');
const { validateEmail } = require('../utils/validate'); // Import hàm validate

const createClass = async (req, res) => {
    try {
        const userId = req.decoded.userId;
        const { name, des, expectedDuration, category } = req.body;
        if (!name || !des || !expectedDuration || !category) {
            return handleResponse(res, null, 'Missing required fields', 400);
        }
        const images = req.files ? req.files.map((file) => file.path) : [];

        const data = {
            instructor: userId,
            name,
            des,
            expectedDuration,
            category: JSON.parse(category),
            photoURL: images,
        };

        const response = await service.createClass(data);
        handleResponse(res, response);
    } catch (error) {
        console.error(error); // Ghi lại lỗi để theo dõi
        handleResponse(
            res,
            null,
            error.message || 'Internal server error',
            500
        );
    }
};

const createClassInstance = async (req, res) => {
    try {
        const { classId, name, des } = req.body;
        if (!classId || !name || !des) {
            return handleResponse(res, null, 'Missing required fields', 400);
        }
        const response = await service.createClass(req.body);
        handleResponse(res, response);
    } catch (error) {
        console.error(error); // Ghi lại lỗi để theo dõi
        handleResponse(
            res,
            null,
            error.message || 'Internal server error',
            500
        );
    }
};

const getAllClass = async (req, res) => {
    try {
        const { page, sort, filter, order, limit } = req.query;
        const pageNumber = page ? parseInt(page, 10) : 1;
        const orderNum = order === '-1' ? -1 : 1; 

        const data = { pageNumber, sort, filter, orderNum };

        const response = await service.getAllClass(data);
        handleResponse(res, response);
    } catch (error) {
        console.error(error);
        handleResponse(res, null, error.message || 'Internal server error', 500);
    }
};

const getOneClass = async (req, res) => {
    try {
        const idUser = req.decoded.id;
        const idClass = req.params.id;
        const data = { idUser, idClass };

        const response = await service.getOneClass(data);
        handleResponse(res, response);
    } catch (error) {
        console.error(error);
        handleResponse(res, null, error.message || 'Internal server error', 500);
    }
};


module.exports = {
    createClass,
    getAllClass,
    getOneClass,

};
