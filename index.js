const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./src/manager');
const Intern = require('./src/intern');
const Engineer = require('./src/engineer');
const allEmployees = []

const generateHTML = (employee) => {
    const generateManager = (manager) => {
        return `<div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="manager-card" style="width: 18rem;">
        <div class="card-header">
        <h1 class="card-title">${manager.name}</h1>
        <h2 class="card-text">${manager.getRole()}</h2>
        </div>
      <div class="card-body">
          <ul class="list-group list-group-flush">
                <li class="list-group-item">ID ${manager.id}</li>
                <li class="list-group-item">Email: <a href="mailto:${manager.email}">${manager.email}</a></li>
                <li class="list-group-item">Office Number: ${manager.officeNumber}</li>
          </ul>
      </div>
      </div>
      </div>`
    }
    const generateEngineer = (engineer) => {
        const tempArray = []
        for (let i = 0; i < engineer.length; i++) {

            const engineerEl = `<div class="row row-cols-1 row-cols-md-2 g-4">
     <div class="engineer-card" style="width: 18rem;">
        <div class="card-header">
            <h1 class="card-title">${engineer[i].name}</h1>
            <h2 class="card-text">${engineer[i].getRole()}</h2>
        </div>
        <div class="card-body">
            <ul class="list-group list-group-flush">
                 <li class="list-group-item">ID ${engineer[i].id}</li>
                <li class="list-group-item">Email: <a href="mailto:${engineer[i].email}">${engineer[i].email}</a></li>
                <li class="list-group-item">GitHub: <a href="github.com/${engineer[i].github}">${engineer[i].github}</a></li>
            </ul>
        </div>
  </div>
  </div>`
            tempArray.push(engineerEl)
        }
        return tempArray.join(" ")
    }
    const generateIntern = (intern) => {
        const tempArray = []
        for (let i = 0; i < intern.length; i++) {

            const internEl = `<div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="intern-card" style="width: 18rem;">
            <div class="card-header">
            <h1 class="card-title">${intern[i].name}</h1>
            <h2 class="card-text">${intern[i].getRole()}</h2>
            </div>
      <div class="card-body">
          <ul class="list-group list-group-flush">
                <li class="list-group-item">ID ${intern[i].id}</li>
                <li class="list-group-item">Email: <a href="mailto:${intern[i].email}">${intern[i].email}</a></li>
                <li class="list-group-item">School: ${intern[i].school}</li>
          </ul>
      </div>
      </div>
      </div>`
            tempArray.push(internEl)
        }
        return tempArray.join(" ")
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <link rel="stylesheet" href="style.css">
      <title>Team Profile</title>
</head>
<body>
    <div class="jumbotron jumbotron-fluid">
          <div class="container">
              <h1>My Team</h1>
          </div>
    </div>
    <div class="card-group">
    ${generateManager(employee[0])}
    ${generateEngineer(employee.filter(engineer => (engineer.getRole() === "Engineer")))}
    ${generateIntern(employee.filter(intern => (intern.getRole() === "Intern")))}
    </div>
</body>
</html>`
};
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

            fs.writeFile('./dis/index.html', htmlPageContent, (err) =>
                err ? console.log(err) : console.log('Successfully created index.html!')
            );
        }
    })
}
mainPrompt()
