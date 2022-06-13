// Required packages to run application
const fs = require('fs');
const inquirer = require('inquirer');
// Import constructor classes
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
// Import function to generate HTML
const generateHtml = require('./src/generateHtml')

const teamMembers = [];

const addManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the managers name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the managers id?', 
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the managers email?', 
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the managers office number?',
        },
    ])
    .then(data => {
        const manager = new Manager(data.name, 'Manager', data.id, data.email, data.officeNumber);
        console.log(manager);
        teamMembers.push(manager);
    })
    .then(addEmployee)
};

// Array of questions for user input
const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the team members name?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select the team members role:',
            choices: [
                'Engineer', 
                'Intern'
            ]
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the team members id number?', 
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the team members email address?', 
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the engineers github username?', 
            when: (input) => input.role === 'Engineer',
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the interns school name?', 
            when: (input) => input.role === 'Intern',
        },
        {
            type: 'confirm',
            name: 'addMore',
            message: 'Would you like to an additional team member?',
            default: false
        }
    ]).then(teamMemberData => {
            let { role, name, id, email, github, school, addMore} = teamMemberData;
            let employee;

            if (role === 'Engineer') {
                employee = new Engineer(name, id, email, github);
                console.log(employee);
                teamMembers.push(employee);

            } else if (role === 'Intern') {
                employee = new Intern(name, id, email, school);
                console.log(employee)
                teamMembers.push(employee);
        } 
    });
}


// // TODO: Write function to writefile
// const writeToFile = data => {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(`./dist/index.html`, generateHtml(teamMembers), err => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve({
//                 ok: true,
//                 message: 'Team profile was generated'
//             });
//         });
//     });
// };

// TODO: Write function to initialize application
function init() {
    addManager()
}

// // Function call to initialize app
// init()
//     .then(pageHtml => {
//         return writeToFile(pageHtml);
//     })
//     .then(writeFileResponse => {
//         console.log(writeFileResponse);
//     })
//         .catch(err => {
//         console.log(err);
//     });;

init()
