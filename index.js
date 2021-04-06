const inquirer = require('inquirer');

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

function viewInfo() {
    inquirer.prompt([
        {
            name: 'choose',
            type: 'list',
            message: 'what information would you like to view?',
            choices: ['employees', 'roles', 'departments']
        }
    ])
        .then(function (data) {
            switch (data.choose) {

                case 'employees':
                    viewEmployees()
                    break;

                case 'roles':
                    viewRoles()
                    break;

                case 'departments':
                    viewDepartments()
                    break;
            };

        });

    function viewEmployees() {
        console.log('view employees alphabetically')
    };

    function viewRoles() {
        console.log('view employees by role');
    };

    function viewDepartments() {
        console.log('view employees by department');
    };

}

function addInfo() {
    inquirer.prompt([
        {
            name: 'add',
            type: 'list',
            message: 'what information would you like to add?',
            choices: ['employee', 'role', 'department']
        }
    ])
        .then(function (data) {
            console.log(data.add);
            switch (data.add) {

                case 'employee':
                    addEmployee()
                    break;

                case 'role':
                    addRole()
                    break;

                case 'department':
                    addDepartment()
                    break;
            }
        });
}

function addEmployee() {
    console.log('add employee inquirer prompt');
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
    console.log('update role inquirer prompt');
}

function updateManager() {
    console.log('update manager inquirer prompt');
}

function updateDepartment() {
    console.log('update department inquirer prompt');
}



