const pword = 'dotenvenvy';
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


doWhat()

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
            choices: ['all employees', 'employees by role', 'employees by department']
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
            };

        });
}

function viewEmployees() {
    const employeez = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: pword,
        database: 'employeesDB'
    });
    employeez.query('SELECT * FROM employee', (err, rows) => {
        if (err) throw err;

        rows.forEach((row) => {
            console.table(row);
        });
        doWhat()
    });
};

function viewByRole() {
    inquirer.prompt([
        {
            name: 'role_title',
            type: 'list',
            message: 'view all in role:',
            choices: ['Sales Lead', 'Salesperson', 'Legal Team Lead', 'Legal Associate', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant']
        }
    ])
        .then(function (data) {
            const employeez = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: pword,
                database: 'employeesDB'
            });
            employeez.query(
                'SELECT employee.first_name, employee.last_name FROM employee JOIN role ON employee.role_id=role.id WHERE ?',
                {
                    title: `${data.role_title}`,
                },
                (err, rows) => {
                    if (err) throw err;


                    rows.forEach((row) => {
                        console.table(row);


                    });
                    doWhat();
                })
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
            const departmentView = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: pword,
                database: 'employeesDB'
            });
            departmentView.query(
                'SELECT * FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id WHERE ?',
                {
                    name: `${data.department_title}`,
                },
                (err, rows) => {
                    if (err) throw err;
                    console.log(
                        `${data.department_title}`)

                    rows.forEach((row) => {
                        console.table(row);

                    });
                    doWhat();
                })
        })
};

function addInfo() {
    inquirer.prompt([
        {
            name: 'add',
            type: 'list',
            message: 'what information would you like to add?',
            choices: ['new employee', 'new role', 'new department']
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
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Legal Team Associate']
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
                            if (err) throw err;
                            console.log(`${data.affectedRows} employee record added\n`);
                        }
                    );
                });


        });
}



function addRole() {
    console.log('add role inquirer prompt');
}

function addDepartment() {
    console.log('add department prompt');
}

function updateInfo() {
    inquirer.prompt([
        {
            name: 'update',
            type: 'list',
            message: 'what information would you like to update?',
            choices: ['employee role', 'employee manager', 'employee department']
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
            }
        });

}

function updateRole() {
    console.log('UPDATE EMPLOYEE ROLE');
}

function updateManager() {
    console.log('update manager inquirer prompt');
}

function updateDepartment() {
    console.log('update department inquirer prompt');
}

function deleteInfo() {
    inquirer.prompt([
        {
            name: 'delete_info',
            type: 'list',
            message: 'what would you like to delete?',
            choices: ['employee', 'manager', 'role', 'department']
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
                }]
            ),
                (err, data) => {
                    if (err) throw err;
                    console.log(`${data.affectedRows} employee record deleted\n`);
                };
        });
};
