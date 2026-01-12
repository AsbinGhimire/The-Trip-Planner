// code for handling errors asynchoronous

module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            console.error("Async Error:", err);
            res.status(500).send("Internal Server Error: " + err.message);
        });
    };
};