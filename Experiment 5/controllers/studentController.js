const Student = require('../models/Student');

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.render('pages/students', { 
            students, 
            sub: '5.2', 
            error: req.query.error, 
            success: req.query.success 
        });
    } catch (err) {
        res.render('pages/students', { students: [], sub: '5.2', error: err.message, success: null });
    }
};

exports.addStudent = async (req, res) => {
    try {
        await Student.create(req.body);
        res.redirect('/students?success=Student Added');
    } catch (err) {
        res.redirect('/students?error=' + err.message);
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect('/students?success=Student Removed');
    } catch (err) {
        res.redirect('/students?error=' + err.message);
    }
};
