const Class = require('../models/Class');
const ClassInstance = require('../models/ClassInstance');
const Instructor = require('../models/Instructor');
const Student = require('../models/Student');

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
        const newInstance = await ClassInstance.create(data.classInstance);
        if (!newInstance) {
            throw new Error('Cannot create Class Instance');
        }
        const updatedClass = await Class.findByIdAndUpdate(
            data.idClass,
            {
                $inc: { times: 1 }, // Cộng thêm 1 vào giá trị times
                $push: { instances: newInstance._id }, // Thêm ID của instance mới vào mảng
            },
            { new: true }
        );
        if (!updatedClass) {
            throw new Error('Cannot find Class');
        }

        return newInstance;
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

        // Tìm lớp theo ID, populate cả 'instructor' và 'instances'
        const cl = await Class.findById(data.idClass)
            .populate('instructor') // Populate giảng viên
            .populate({
                path: 'instances',
                populate: { path: 'timeSlots' }, // Populate thêm các timeSlots bên trong instances (nếu có)
            });

        if (!cl) {
            throw new Error('Class not found');
        }

        let isOwner = 0;

        // Kiểm tra người dùng có phải là giảng viên không
        if (data.idUser === cl.instructor._id.toString()) {
            isOwner = 1;
        }

        return {
            isOwner,
            cl,
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

const getOneClassInstance = async (data) => {
    try {
        const classInstance = await ClassInstance.findOne({
            _id: data.idInstance, // ID instance cần tìm
            deletedAt: null,
        }).populate('timeSlots'); // Nếu cần populate timeSlots

        if (!classInstance) {
            throw new Error('Class instance not found');
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
        const appendStudent = await ClassInstance.findByIdAndUpdate(
            data.idClassInstance,
            {
                $addToSet: { pendingStudents: data.idUser },
            },
            { new: true }
        );
        if (!appendStudent) {
            throw new Error('Cannot append Student');
        }
        const enrollClass = await Student.findByIdAndUpdate(
            data.idStudent,
            { $addToSet: { enrolledClasses: data.idClass } },
            { new: true }
        );
        if (!enrollClass) {
            await ClassInstance.findByIdAndUpdate(
                data.idClassInstance,
                {
                    $pull: { pendingStudents: data.idUser },
                },
                { new: true }
            );
            throw new Error('Cannot enrolledClass');
        }
        return 1;
    } catch (err) {
        throw new Error(err.message);
    }
};

const acceptStudent = async (data) => {
    try {
        const acceptStudent = await ClassInstance.findByIdAndUpdate(
            data.idClassInstance,
            {
                $push: { students: data.idStudent },
                $pull: { pendingStudents: data.idStudent },
            },
            {new: true}
        );
        if(!acceptStudent) {
            throw new Error('Cannot accept Student');
        }
        return acceptStudent;
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
    joinClass,
    acceptStudent,
    getOneClassInstance,
};
