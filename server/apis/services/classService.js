const Class = require('../models/Class');
const ClassInstance = require('../models/ClassInstance');
const Instructor = require('../models/Instructor');

const createClass = async (data) => {
    try {
        const res = await Class.create(data);
        if(!res) {
            throw new Error('');
        }
        await Instructor.findByIdAndUpdate(
            data.id, 
            { $inc: { classCount: 1 } }, // Cộng thêm 1 vào giá trị classCount
            { new: true } 
        );
        return res; 
    } catch (err) {
        throw new Error(err.message); 
    }
};

const createClassInstance = async (data) => {
    try {
        const res = await ClassInstance.create(data);
        if(!res) {
            throw new Error('');
        }
        await Class.findByIdAndUpdate(data.id, 
            { $inc: { times: 1 } }, // Cộng thêm 1 vào giá trị times
            { new: true } 
        );
        return res;
    } catch (err) {
        throw new Error(err.message); 
    }
};

const getAllClass = async (data) => {
    try {
        const res = Class.find();
        return res; 
    } catch (err) {
        throw new Error(err.message); 
    }
};

const getOneClass = async (data) => {
    try {
        const cl = Class.findById(data.id);
        let classInstance;
        if(data.instructor === cl.instructor) {
            classInstance = ClassInstance.find({ class: cl._id });
        } else {
            classInstance = ClassInstance.find({ class: cl._id }).select('-students -pendingStudents');
        }
        return classInstance; 
    } catch (err) {
        throw new Error(err.message); 
    }
};

const updateClass = async (data) => {
    try {
        
    } catch (err) {
        throw new Error(err.message); 
    }
};

const updateClassInstance = async (data) => {
    try {
        const res = Class.create(data);
        return res; 
    } catch (err) {
        throw new Error(err.message); 
    }
};

const getOneClassByOther = async (data) => {
    try {
        const res = Class.create(data);
        return res; 
    } catch (err) {
        throw new Error(err.message); 
    }
};

const joinClass = async (data) => {
    try {
        const res = Class.create(data);
        return res; 
    } catch (err) {
        throw new Error(err.message); 
    }
};

const acceptStudent = async (data) => {
    try {
        const res = Class.create(data);
        return res; 
    } catch (err) {
        throw new Error(err.message); 
    }
};

const kickStudent = async (data) => {
    try {
        const res = Class.create(data);
        return res; 
    } catch (err) {
        throw new Error(err.message); 
    }
};

const getStudentList = async (data) => {
    try {
        const res = Class.create(data);
        return res; 
    } catch (err) {
        throw new Error(err.message); 
    }
};




module.exports = {
    createClass,
    createClassInstance,
    getAllClass,
    // updateClass,
    // updateClassInstance,
    getOneClass,
    // getOneClassByOther,
    // getStudentList,

}