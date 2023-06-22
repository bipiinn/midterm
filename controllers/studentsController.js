const student = require('../models/student.model.js');

// Create and Save a new student
exports.create = (req, res) => {
    // Validate request
    if(!req.body.age) {
        return res.status(400).send({
            message: "student name can not be empty"
        });
    }

    // Create a student
    const Student = new student({
        name: req.body.name || "Untitled student", 
        age: req.body.age,
        major: req.body.major,
        createdDate: req.body.createdDate,
        updatedDate: req.body.updatedDate
    });

    // Save student in the database
    Student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the student."
        });
    });
};

// Retrieve and return all students from the database.
exports.findAll = (req, res) => {
    student.find()
    .then(student => {
        res.send(student);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
};

// Find a single student with a id
exports.findOne = (req, res) => {
    student.findById(req.params.id)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.id
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "student not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving student with id " + req.params.id
        });
    });
};

// Update a student identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "student name can not be empty"
        });
    }

    // Find student and update it with the request body
    student.findByIdAndUpdate(req.params.id, {
        name: req.body.name || "Untitled student",
        age: req.body.age,
        major: req.body.major
    }, {new: true})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.id
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "student not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating student with id " + req.params.id
        });
    });
};

// Delete a student with the specified id in the request
exports.delete = (req, res) => {
    student.findByIdAndRemove(req.params.id)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.id
            });
        }
        res.send({message: "student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "student not found with id " + req.params.student
            });                
        }
        return res.status(500).send({
            message: "Could not delete student with id " + req.params.id
        });
    });
};