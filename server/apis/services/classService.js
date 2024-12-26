const Class = require('../models/Class');
const ClassInstance = require('../models/ClassInstance');
const Instructor = require('../models/Instructor');

const createClass = async (data) => {
    try {
        const res = await Class.create(data);
        if (!res) {
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
        if (!res) {
            throw new Error('');
        }
        await Class.findByIdAndUpdate(
            data.id,
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
        const filter = data.filter || {}; // Đảm bảo filter có giá trị mặc định là object rỗng
        const query = { deletedAt: null }; // Khởi tạo truy vấn

        // Kiểm tra xem có lọc theo category không
        if (filter && filter.length > 0) {
            // Sử dụng toán tử $in để lọc theo nhiều category
            query.category = { $in: filter };
        }

        // Tính toán số bản ghi bỏ qua
        const skip = (data.pageNumber - 1) * 12;

        const classes = await Class.find(query)
            .select('-students -instances -rates')
            .sort({ [data.sort]: data.orderNum })
            .skip(skip)
            .limit(Number(12));

        const total = await Class.countDocuments(query);
        const pageTotal = Math.ceil(total / 12);

        return { classes, total, pageTotal };
    } catch (err) {
        throw new Error(err.message);
    }
};

const getOneClass = async (data) => {
    try {
        console.log(data.idClass);
        // Tìm lớp theo ID và tự động lấy thông tin giảng viên
        const cl = await Class.findById(data.idClass).populate('instructor');
        if (!cl) {
            throw new Error("Class not found");
        }

        let isOwner = 0;
        let classInstance;
        // Kiểm tra người dùng có phải là giảng viên không
        if (data.idUser === cl.instructor._id.toString()) {
            isOwner = 1;
            classInstance = await ClassInstance.find({ class: cl._id, deletedAt: null });
        } else {
            classInstance = await ClassInstance.find({ class: cl._id, deletedAt: null }).select(
                '-students -pendingStudents'
            );
        }

        // Trả về thông tin lớp cùng với thông tin giảng viên
        return {
            isOwner,
            cl,
            classInstance
        };
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
};
