const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema(
    {
        department_id: {
            type: String,
            required: true,
            unique:true
        },
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        }
    }
)

const Department=mongoose.model("Department",DepartmentSchema);
module.exports = Department;