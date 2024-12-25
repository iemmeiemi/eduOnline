const Category = require('../models/Category');



const getAllCategory = async () => {
    try {
        const res = await Category.find({ deletedAt: null }).select('-creator -createdAt -deletedAt -des -photoURL');
        return res; 
    } catch (err) {
        throw new Error(err.message); 
    }
};

const getAllCategoryInfo = async () => {
    try {
        const res = Category.find().select('');
        return res; 
    } catch (err) {
        throw new Error(err.message); 
    }
};

const getOneCategoryById = async (data) => {
    try {
        const res = Category.findById(data.id);
        return res; 
    } catch (err) {
        throw new Error(err.message); 
    }
};

module.exports = {
    getAllCategory,
    getOneCategoryById,

}