const pword = 'Radiohead11';
const mysql = require('mysql');
const inquirer = require('inquirer');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: pword,
    database: 'employeesDB',
});

con.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

const ROLES = ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Legal Team Associate'];


// The command-line application should allow users to:
// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles
doWhat();

function doWhat() {
    inquirer.prompt([
        {
            name: 'choose',
            type: 'list',
            message: 'what would you like to do?',
            choices: ['add information', 'view information', 'update information', 'delete information', 'exit the program']
        }
    ])
        .then(function (data) {
            switch (data.choose) {

                case 'view information':
                    viewInfo()
                    break;

                case 'add information':
                    addInfo()
                    break;

                case 'update information':
                    updateInfo()
                    break;

                case 'delete information':
                    deleteInfo()
                    break;

                case 'exit the program':
                    console.log('Bye')
                    break;
            }
        });
}

function viewInfo() {
    inquirer.prompt([
        {
            name: 'choose',
            type: 'list',
            message: 'what information would you like to view?',
            choices: ['all employees', 'employees by role', 'employees by department', 'return to the menu']
        }
    ])
        .then(function (data) {
            switch (data.choose) {

                case 'all employees':
                    viewEmployees();
                    break;

                case 'employees by role':
                    viewByRole();
                    break;

                case 'employees by department':
                    viewByDepartment();
                    break;
                case 'return to the menu':
                    doWhat();
                    break;
            };

        });
}

function viewEmployees() {
    con.query('SELECT last_name AS lastName, first_name as firstName, employee.id AS employeeID, manager_id as managerID, department.name AS deptName, department.id AS deptID, role.title AS jobTitle, role.id AS jobTitleCode FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id ORDER BY last_name ASC',
        (err, rows) => {
            // console.log(rows);
            if (err) throw err;

            // rows.forEach((row) => {
            console.log(`\n`)
            console.table(rows),
                console.log(`\n`);


        });
    doWhat()
};

function viewByRole() {
    inquirer.prompt([
        {
            name: 'role_title',
            type: 'list',
            message: 'view all in role:',
            choices: ROLES
        }
    ])
        .then(function (data) {
            con.query(
                'SELECT * FROM employee JOIN role ON employee.role_id = role.id WHERE ?',
                {
                    title: `${data.role_title}`,
                },
                (err, rows) => {
                    if (err) throw err;


                    console.log(`\n`)
                    console.table(rows),
                        console.log(`\n`);


                });
            doWhat();

        })
};

function viewByDepartment() {
    inquirer.prompt([
        {
            name: 'department_title',
            type: 'list',
            message: 'view all employees in department: ',
            choices: ['Sales', 'Legal', 'Development', 'Accounts']
        }
    ])
        .then(function (data) {
            con.query(
                'SELECT * FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id WHERE ?',
                {
                    name: `${data.department_title}`,
                },
                (err, rows) => {
                    if (err) throw err;
                    console.log(`\n`),
                        console.table(rows),
                        console.log(`\n`);

                });
            doWhat();

        })
};

function addInfo() {
    inquirer.prompt([
        {
            name: 'add',
            type: 'list',
            message: 'what information would you like to add?',
            choices: ['new employee', 'new role', 'new department', 'return to the menu']
        }
    ])
        .then(function (data) {
            console.log(data.add);
            switch (data.add) {

                case 'new employee':
                    addEmployee()
                    break;

                case 'new role':
                    addRole()
                    break;

                case 'new department':
                    addDepartment()
                    break;
                case 'return to the menu':
                    doWhat();
                    break;
            }
        });
}

function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'what is the employee\'s first name?'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'what is the employee\'s last name?'
        },
        {
            name: 'role',
            type: 'list',
            message: 'what is the new employee\'s role?',
            choices: ROLES
        }
    ])
        .then((data) => {
            con.query('SELECT id FROM role WHERE ?',
                { title: data.role },
                (err, result) => {
                    var role_id = result[0].id;
                    con.query('INSERT INTO employee SET ?',
                        {
                            first_name: data.first_name,
                            last_name: data.last_name,
                            role_id: role_id
                        },
                        (err, data) => {
                            console.log(`\n ${data.affectedRows} employee record added`),
                                console.log(`\n`);
                            if (err) throw err;
                        }
                    );

                    doWhat();
                });


        });

};

function addRole() {
    console.log('function under construction. have a lovely day.');
};

function addDepartment() {
    console.log('function under construction. have a lovely day.');
}

function updateInfo() {
    inquirer.prompt([
        {
            name: 'update',
            type: 'list',
            message: 'what information would you like to update?',
            choices: ['employee role', 'employee manager', 'employee department', 'return to the menu']
        }

    ])
        .then(function (data) {
            console.log(data.update);
            switch (data.update) {

                case 'employee role':
                    updateRole()
                    break;

                case 'employee manager':
                    updateManager()
                    break;

                case 'employee department':
                    updateDepartment()
                    break;
                case 'return to the menu':
                    doWhat();
                    break;
            }
        });

};

function updateRole() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'what is the employee\'s first name?',
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'what is the employee\'s last name?',
        },
        {
            name: 'old_role',
            type: 'list',
            message: 'select the employee\'s former role.',
            choices: ROLES
        },
        {
            name: 'new_role',
            type: 'list',
            message: 'select the employee\'s new role.',
            choices: ROLES
        }
    ])

        .then((data) => {
            // var newRoleId, employee_id;
            // Query for the role_id that corresponds to the new_role
            con.query('SELECT id FROM role WHERE role.title = ?',
                data.new_role,
                (err, result) => {
                    if (err) throw err;
                    newRoleId = parseInt(result[0].id);
                }
            );

            // Query for the employee id that corresponds to the first, last, and old_role
            con.query('SELECT employee.id FROM employee JOIN role ON employee.role_id = role.id WHERE employee.first_name = ? AND employee.last_name = ? AND role.title = ?',
                [
                    data.first_name,
                    data.last_name,
                    data.old_role
                ],
                (err, result) => {
                    if (err) throw err;
                    employee_id = parseInt(result[0].id);
                    // Query to update the employee based on the ids we found.
                    con.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employee_id],
                        (err, data) => {
                            if (err) throw err;
                            console.log(`\n ${data.affectedRows} records updated. \n`);
                        }
                    );

                }
            );

            doWhat();
        });

}

function updateManager() {
    console.log('function under construction. have a lovely day.');
}

function updateDepartment() {
    console.log('function under construction. have a lovely day.');
}

function deleteInfo() {
    inquirer.prompt([
        {
            name: 'delete_info',
            type: 'list',
            message: 'what would you like to delete?',
            choices: ['employee', 'manager', 'role', 'department', 'return to the menu']
        }
    ])

        .then(function (data) {
            switch (data.delete_info) {

                case 'employee':
                    deleteEmployee();
                    break;

                case 'manager':
                    deleteManager();
                    break;

                case 'role':
                    deleteRole();
                    break;

                case 'department':
                    deleteDepartment();
                    break;
                case 'return to the menu':
                    doWhat();
                    break;
            }

        })
};

function deleteEmployee() {
    inquirer.prompt([
        {
            name: 'delete_first',
            type: 'input',
            message: 'what is the employee\'s first name?'
        },
        {
            name: 'delete_last',
            type: 'input',
            message: 'what is the employee\'s last name?'
        }
    ])
        .then(function (data) {
            con.query('DELETE FROM employee WHERE ?',
                [{
                    first_name: data.delete_first
                },
                {
                    last_name: data.delete_last
                }
                ]),
                (err, data) => {
                    if (err) throw err;
                    console.log(`${data.affectedRows} employee record deleted\n`);
                };
                doWhat();
            });
       };
  
    

function deleteManager() {
    console.log('function under construction. have a lovely day.');
};

function deleteRole() {
    console.log('function under construction. have a lovely day.');
};

function deleteDepartment() {
    console.log('function under construction. have a lovely day.');
};

