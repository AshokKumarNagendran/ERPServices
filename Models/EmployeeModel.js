const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema(
    {
        employee_id: {
            type: String,
            required: true,
            unique:true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        department_id: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        }
    }
)

const Employees=mongoose.model("Employees",EmployeeSchema);
module.exports = Employees;