const handleResponse = (res, data, message, status = 200) => {
    res.status(status).json({ data, message });
};

module.exports = { handleResponse };