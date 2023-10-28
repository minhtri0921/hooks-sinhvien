const studentRouter = require('./student');


function route(app) {
    app.use('/students', studentRouter);
}

module.exports = route;