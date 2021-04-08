const pword = 'twopurpleoctopi*';
const mysql = require('mysql');
const inquirer = require('inquirer');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: pword,
});

con.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

con.end((err) => {
});

doWhat()

function doWhat() {
    inquirer.prompt([
        {
            name: 'choose',
            type: 'list',
            message: 'what would you like to do?',
            choices: ['view information', 'add information', 'update information']
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
            console.log(`
${row.first_name} ${row.last_name} ID: ${row.id}
dept: ${row.role_id} | manager: ${row.manager_id}
`);
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
                    console.log(
                        `${data.title}s`)

                    rows.forEach((row) => {
                        console.log(`
        ${row.last_name}, ${row.first_name}
                        `);

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
                // 'SELECT employee.first_name, employee.last_name FROM employee JOIN role ON employee.role_id=role.id WHERE ?',
                'SELECT * FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id WHERE ?',
                {
                    name: `${data.department_title}`,
                },
                (err, rows) => {
                    if (err) throw err;
                    console.log(
                        `${data.department_title}`)

                    rows.forEach((row) => {
                        console.log(`${row.last_name}, ${row.first_name}
            `);

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
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Developer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Legal Associate']
        }
    ])
        .then((data) => {
            var employeeAdd = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: pword,
                database: 'employeesDB'
            });
            employeeAdd.query(`
                SELECT role.id, role.title, role.department_id, employee.role_id FROM role JOIN employee ON employee.role_id = role.id ORDER BY role_id ASC`)
            // INSERT INTO employee SET ?`,
            // {
            //     first_name: data.first_name,
            //     last_name: data.last_name,
            //     role_id: employee.role_id,
            // },
            // (err) => {
            //     if (err) throw err;
            //     console.log('new employee added.');
            console.log(data);
            doWhat()
        }
        )
}
//         )
// }


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
    console.log('update role inquirer prompt');
}

function updateManager() {
    console.log('update manager inquirer prompt');
}

function updateDepartment() {
    console.log('update department inquirer prompt');
}




