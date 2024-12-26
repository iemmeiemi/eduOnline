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
        const { idClass, instance } = req.body;
        if (!idClass || !instance) {
            return handleResponse(res, null, 'Missing required fields', 400);
        }
        const data = {
            idClass, classInstance : instance
        }
        const response = await service.createClassInstance(data);
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

const getOneClassInstance = async (req, res) => {
    try {
        const idUser = req.decoded.id;
        const idInstance = req.params.id;
        const data = { idUser, idInstance };

        const response = await service.getOneClassInstance(data);
        handleResponse(res, response);
    } catch (error) {
        console.error(error);
        handleResponse(res, null, error.message || 'Internal server error', 500);
    }
};


const joinClass = async (req, res) => {
    try {
        const idUser = req.decoded.id;
        const idClassInstance = req.params.id;
        const {idClass, idStudent} = req.body;
        console.log(idUser, idClass, idClassInstance, idStudent );
        if(!idUser || !idClass || !idClassInstance || !idStudent) {
            return handleResponse(res, null, 'Missing required fields', 400);
        }
        const data = { idUser, idClass, idClassInstance, idStudent};

        const response = await service.joinClass(data);
        handleResponse(res, response);
    } catch (error) {
        console.error(error);
        handleResponse(res, null, error.message || 'Internal server error', 500);
    }
};

const acceptStudent = async (req, res) => {
    try {
        const idUser = req.decoded.userId;
        const {idStudent, idClassInstance} = req.body;
        console.log(idUser, idStudent, idClassInstance);

        if(!idUser || !idClassInstance || !idStudent) {
            return handleResponse(res, null, 'Missing required fields', 400);
        }
        const data = { idUser, idClassInstance, idStudent};

        const response = await service.acceptStudent(data);
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
    createClassInstance,
    joinClass,
    acceptStudent,
    getOneClassInstance,
    

};
