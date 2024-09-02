To start : node index.js

MongoDB Database name : ERP

Collections:
1.employees
2.departments
3.attendances

Curls;
1.Add New Employee:
curl --location 'http://localhost:3000/erp/employees' \
--header 'Content-Type: application/json' \
--data-raw '{
    "employee_id": "Emp1005",
    "name": "Loki",
    "email": "loki@greentech.com",
    "department_id": "Dept1001",
    "designation": "Tester"
}'

2.Add New Department:
curl --location 'http://localhost:3000/erp/department' \
--header 'Content-Type: application/json' \
--data '{
    "department_id": "Dept3003",
    "name": "Sales",
    "location": "Chennai"
}'

3.Record Attendance
a)checkin
curl --location 'http://localhost:3000/erp/attendance/checkin' \
--header 'Content-Type: application/json' \
--data '{
    "attendance_id": "att1002",
    "employee_id": "Emp1002",
    "status": "Present"
}'

b)checkout
curl --location 'http://localhost:3000/erp/attendance/checkout' \
--header 'Content-Type: application/json' \
--data '{
    "attendance_id": "att1002",
    "employee_id": "Emp1002",
    "status": "Present"
}'

c)Onleave or absent
curl --location 'http://localhost:3000/erp/attendance/nocheckin' \
--header 'Content-Type: application/json' \
--data '{
    "attendance_id": "att1004",
    "employee_id": "Emp1004",
    "status": "Absent"
}'

4.Get Employee Details
curl --location 'http://localhost:3000/erp/employees?employee_id=Emp1002'

