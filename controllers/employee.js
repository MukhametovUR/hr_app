/*01*/const employees = require('../db_apis/employees.js');
/*02*/ 
/*03*/async function get(req, res, next) {
/*04*/  try {
/*05*/    const context = {};
/*06*/ 
/*07*/    context.id = parseInt(req.params.id, 10);
/*08*/ 
/*09*/    const rows = await employees.find(context);
/*10*/ 
/*11*/    if (req.params.id) {
/*12*/      if (rows.length === 1) {
/*13*/        res.status(200).json(rows[0]);
/*14*/      } else {
/*15*/        res.status(404).end();
/*16*/      }
/*17*/    } else {
/*18*/      res.status(200).json(rows);
/*19*/    }
/*20*/  } catch (err) {
/*21*/    next(err);
/*22*/  }
/*23*/}
/*24*/
/*25*/module.exports.get = get;

function getEmployeeFromRec(req) {
  const employee = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    hire_date: req.body.hire_date,
    job_id: req.body.job_id,
    salary: req.body.salary,
    commission_pct: req.body.commission_pct,
    manager_id: req.body.manager_id,
    department_id: req.body.department_id
  };
 
  return employee;
}
 
async function post(req, res, next) {
  try {
    let employee = getEmployeeFromRec(req);
 
    employee = await employees.create(employee);
 
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
}
 
module.exports.post = post;

async function put(req, res, next) {
  try {
    let employee = getEmployeeFromRec(req);
 
    employee.employee_id = parseInt(req.params.id, 10);
 
    employee = await employees.update(employee);
 
    if (employee !== null) {
      res.status(200).json(employee);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.put = put;

async function del(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
 
    const success = await employees.delete(id);
 
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.delete = del;