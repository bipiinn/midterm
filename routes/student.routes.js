module.exports = (app) => {
    const students = require('../controllers/studentsController.js');

    // Adding a new student
    app.post('/students', students.create);

    // Retrieve all student
    app.get('/students', students.findAll);

    // Retrieve a single student with studentId
    app.get('/students/:id', students.findOne);

    // Update a student with studentId
    app.put('/students/:id', students.update);

    // Delete a student with studentId
    app.delete('/students/:id', students.delete);
}