const mysql2 = require('mysql2')

const configDB = {
    host: "localhost",
    user: "root",
    password: "mt2109",
    database: "students"
}

class StudentController {
    async getListStudents(req, res, next) {
        try {
            var con = mysql2.createConnection(configDB);

            const ListStudents = await new Promise((resolve, reject) => {
                con.query(`SELECT * FROM students`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(ListStudents);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async addStudent(req,res,next){
        try {
            const data = req.body
            console.log(data);
            var con = mysql2.createConnection(configDB);

            const ListStudents = await new Promise((resolve, reject) => {
                con.query(`INSERT INTO students(name,address) VALUES ('${data.name}','${data.address}') `, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(ListStudents);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
            
        }
    }
    async editStudent(req,res,next){
        try {
            const data = req.body
            console.log(data);
            var con = mysql2.createConnection(configDB);

            const ListStudents = await new Promise((resolve, reject) => {
                con.query(`UPDATE students SET name = '${data.name}', address = '${data.address}' WHERE id = '${data.id}' `, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(ListStudents);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
            
        }
    }
    async deleteStudent(req,res,next){
        try {
            const id = req.params.id
            console.log(id);
            var con = mysql2.createConnection(configDB);

            const ListStudents = await new Promise((resolve, reject) => {
                con.query(`DELETE FROM students WHERE id = ${id} `, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(ListStudents);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
            
        }
    }
}

module.exports = new StudentController();