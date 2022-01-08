const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./manager');
const Intern = require('./intern');
const Engineer = require('./engineer');
const allEmployees = []

const generateHTML = (employee) =>
    `<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <link rel="stylesheet" href="dis/style.css">
      <title>Document</title>
</head>
<body>
    <div class="jumbotron jumbotron-fluid">
          <div class="container">
              <h1>My Team</h1>
          </div>
    </div>
    <div class="card" style="width: 18rem;">
          <h1 class="card-title">${employee[0].name}</h1>
          <h2 class="card-text">${employee[0].getRole()}</h2>
        <div class="card-body">
            <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID ${employee[0].id}</li>
                  <li class="list-group-item">Email: ${employee[0].email}</li>
                  <li class="list-group-item">GitHub: ${employee[0].github}</li>
                  <li class="list-group-item">Office Number: ${employee[0].officeNumber}</li>
                  <li class="list-group-item">School: ${employee[0].school}</li>
            </ul>
        </div>
 </div>
</body>
</html>`;
function mainPrompt() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Employee Name',
            },
            {
                type: 'list',
                name: 'role',
                message: 'Employee position',
                choices: ['Manager', 'Engineer', 'Intern']
            },
            {
                type: 'input',
                name: 'id',
                message: 'Employee ID',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Employee Email',
            },
        ])
        .then((answers) => {
            if (answers.role === 'Manager') {
                managerPrompts(answers)
            } else if (answers.role === 'Intern') {
                internPrompts(answers)
            } else if (answers.role === 'Engineer') {
                engineerPrompts(answers)
            }

        });
}
// function to ask for another employee
function managerPrompts(employeeData) {
    inquirer.prompt([{
        type: 'input',
        name: 'officeNumber',
        message: 'Managers office number',
    },
    ]).then(function ({ officeNumber }) {
        const newManager = new Manager(employeeData.name, employeeData.id, employeeData.email, officeNumber)
        allEmployees.push(newManager)
        createAnother()
    })
}

function internPrompts(employeeData) {
    inquirer.prompt([{
        type: 'input',
        name: 'school',
        message: 'Intern School',
    }]).then(function ({ school }) {
        const newIntern = new Intern(employeeData.name, employeeData.id, employeeData.email, school)
        allEmployees.push(newIntern)
        createAnother()
    })
}

function engineerPrompts(employeeData) {
    inquirer.prompt([{
        type: 'input',
        name: 'github',
        message: 'Engineer github username',
    }]).then(function ({ github }) {
        const newEngineer = new Engineer(employeeData.name, employeeData.id, employeeData.email, github)
        allEmployees.push(newEngineer)
        createAnother()
    })
}

function createAnother() {
    inquirer.prompt([{
        type: 'list',
        name: 'additional',
        message: 'Would you like to create another employee?',
        choices: ['yes', 'no']
    }]).then(function ({ additional }) {
        if (additional === 'yes') {
            mainPrompt();
        } else {
            const htmlPageContent = generateHTML(allEmployees);

            fs.writeFile('index.html', htmlPageContent, (err) =>
                err ? console.log(err) : console.log('Successfully created index.html!')
            );
        }
    })
}
mainPrompt()