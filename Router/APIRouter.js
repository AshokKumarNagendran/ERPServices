const express = require('express');
const mongoose = require('mongoose');
//below are modules in which schema and models are maintained
const Employees = require('../Models/EmployeeModel.js');
const Attendance = require('../Models/AttendanceModel.js');
const Department = require('../Models/DepartmentModel.js');

const router = express.Router();
//1.RestPI - Add New Employee
router.post('/employees', async (request, response) => {
    try {
        //Read JSON request
        const employeeData = {
            employee_id: request.body.employee_id,
            name: request.body.name,
            email: request.body.email,
            department_id: request.body.department_id,
            designation: request.body.designation
        }
        //Insert to the collection
        let insertResult = await Employees.create(employeeData);
        let data = insertResult;
        if (insertResult === null) {
            response.status(400).send({
                error: 'insert operation failed'
            })
        }
        else {
            response.status(201).send({
                data
            })
        }
    }
    catch (error) {
        response.status(500).send({
            error: 'Internal server error',
            description: error
        }
        )
    }
});
//2.RestPI - Add New Department
router.post('/department', async (request, response) => {
    try {
        //read JSON resquest
        const departmentData = {
            department_id: request.body.department_id,
            name: request.body.name,
            location: request.body.location
        }
        //insert checkin record
        let insertResult = await Department.create(departmentData);
        let data = insertResult;
        if (insertResult === null) {
            response.status(400).send({
                error: 'insert operation failed'
            })
        }
        else {
            response.status(201).send({
                data
            })
        }
    }
    catch (error) {
        response.status(500).send({
            error: 'Internal server error',
            description: error
        }
        )
    }
});
//3.RestPI - Record Attendance, Checkin
router.post('/attendance/checkin', async (request, response) => {
    try {
        //read employeeid param
        const employee_id = request.body.employee_id;
        let employeeLookUpResult = await Employees.findOne({ employee_id });
        if (employeeLookUpResult.employee_id) {
            //lookup employee details from attendance
            let AttendanceLookUpResult = await Attendance.findOne({ employee_id });
            if (AttendanceLookUpResult === null || AttendanceLookUpResult.check_in === null || AttendanceLookUpResult.check_in === undefined
                || AttendanceLookUpResult.check_in === '') {
                let dateTime = new Date();
                dateTime.setDate(dateTime.getDate());
                let currDate = dateTime.toISOString().split('T')[0];//Date sepration from datetime
                const attendanceData = {
                    attendance_id: request.body.attendance_id,
                    employee_id: request.body.employee_id,
                    date: currDate,
                    status: request.body.status,
                    check_in: dateTime
                }
                //insert checkin to attendance
                let insertResult = await Attendance.create(attendanceData);
                let data = insertResult;
                if (insertResult === null) {
                    response.status(400).send({
                        error: 'insert operation failed'
                    })
                }
                else {
                    response.status(201).send();
                }
            }
            else {
                response.status(400).send({
                    error: `${employee_id} already checked in`
                });
            }
        }
        else {
            response.status(400).send({
                error: `${employee_id} not present`
            });
        }
    }
    catch (error) {
        response.status(500).send({
            error: 'Internal server error',
            description: error
        }
        )
    }
});
//3.RestPI - Record Attendance, Checkout
router.post('/attendance/checkout', async (request, response) => {
    try {
        //read employeeid param
        const employee_id = request.body.employee_id;
        let employeeLookUpResult = await Employees.findOne({ employee_id });
        if (employeeLookUpResult.employee_id) {
             //lookup employee details from attendance
            let AttendanceLookUpResult = await Attendance.findOne({ employee_id });
            if (AttendanceLookUpResult === null || AttendanceLookUpResult.check_out === null || AttendanceLookUpResult.check_out === undefined
                || AttendanceLookUpResult.check_out === '') {
                let dateTime = new Date();
                dateTime.setDate(dateTime.getDate());
                let currDate = dateTime.toISOString().split('T')[0];
                const attendanceData = {
                    attendance_id: request.body.attendance_id,
                    employee_id: request.body.employee_id,
                    date: currDate,
                    status: request.body.status,
                    check_out: dateTime
                }
                //update checkout to attendance
                let updateResult = await Attendance.updateOne({ employee_id }, attendanceData);
                let data = updateResult;
                if (updateResult === null) {
                    response.status(400).send({
                        error: 'insert operation failed'
                    })
                }
                else {
                    response.status(201).send();
                }
            }
            else {
                response.status(400).send({
                    error: `${employee_id} already checked out`
                });
            }
        }
        else {
            response.status(400).send({
                error: `${employee_id} not present`
            });
        }
    }
    catch (error) {
        response.status(500).send({
            error: 'Internal server error',
            description: error
        }
        )
    }
});
//3.RestPI - Record Attendance, Absent or OnLeave
router.post('/attendance/nocheckin', async (request, response) => {
    try {
        //read employeeId
        const employee_id = request.body.employee_id;
        //lookup employee details using employeeid
        let employeeLookUpResult = await Employees.findOne({ employee_id });
        if (employeeLookUpResult.employee_id) {
            //lookup attendance details using employeeid
            let AttendanceLookUpResult = await Attendance.findOne({ employee_id });
            if (AttendanceLookUpResult === null || AttendanceLookUpResult.check_in === null || AttendanceLookUpResult.check_in === undefined
                || AttendanceLookUpResult.check_in === '') {
                let dateTime = new Date();
                dateTime.setDate(dateTime.getDate());
                let currDate = dateTime.toISOString().split('T')[0];
                const attendanceData = {
                    attendance_id: request.body.attendance_id,
                    employee_id: request.body.employee_id,
                    date: currDate,
                    status: request.body.status
                }
                let insertResult = await Attendance.create(attendanceData);
                let data = insertResult;
                if (insertResult === null) {
                    response.status(400).send({
                        error: 'insert operation failed'
                    })
                }
                else {
                    response.status(201).send();
                }
            }
            else {
                response.status(400).send({
                    error: `${employee_id} already marked ${request.body.status}`
                });
            }
        }
        else {
            response.status(400).send({
                error: `${employee_id} not present`
            });
        }
    }
    catch (error) {
        response.status(500).send({
            error: 'Internal server error',
            description: error
        }
        )
    }
});
//4.RestPI - Get Employee Details
router.get('/employees', async (request, response) => {
    try {
        const employee_id = request.query.employee_id;
        let employeeDetails = await Employees.findOne({ employee_id });
        let department_id = employeeDetails.department_id;
        let departmentinfo = await Department.findOne({ department_id });
        let date = new Date();
        date.setDate(date.getDate() - 30);
        dateExpected = date.toISOString().split('T')[0];
        let attendanceinfo = await Attendance.find({ employee_id: { $eq: employee_id }, date: { $gte: dateExpected } })
        if (departmentinfo === null || attendanceinfo === null) {
            response.status(400).send({
                error: `${employee_id} not present`
            });
        }
        else {
            response.status(200).send({
                departmentinfo, attendanceinfo
            });
        }
    }
    catch (error) {
        response.status(500).send({
            error: 'Internal server error',
            description: error
        }
        )
    }
})

module.exports = router;