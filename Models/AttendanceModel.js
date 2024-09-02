const mongoose = require('mongoose');

const AttendanceSchema = mongoose.Schema(
    {
        attendance_id:{
            type: String,
            required: true,
            unique:true
        },
        employee_id:{
            type: String,
            required: true
        },
        date :{
            type: Date,
            required: true
        },
        status:{
            type: String,
            required: true
        },
        check_in:{
            type: Date,
        },
        check_out:{
            type: Date,
        }
    }
)

const Attendance=mongoose.model("Attendance",AttendanceSchema);
module.exports = Attendance;