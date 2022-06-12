// Required packages to run application
const fs = require('fs');
const inquirer = require('inquirer');
// Import constructor classes
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');

const teamMembers = [];

// Array of questions for user input
const addEmployee = [
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
                'Manager',
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
            name: 'officeNumber',
            message: 'What is the managers office number?', 
            // TODO add when: statement
            when: (input) => input.role === 'Manager',
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the engineers github username?', 
            // TODO add when: statement
            when: (input) => input.role === 'Engineer',
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the interns school name?', 
            // TODO add when: statement
            when: (input) => input.role === 'Intern',
        },
        {
            type: 'confirm',
            name: 'addMore',
            message: 'Would you like to an additional team members?',
            default: false
        }

    ]
    // .then(employeeInfo => {
        
    //     let {role, name, id, email, github, school, officeNumber, addMore} = employeeInfo;
    //     let employee;

    //     if(role === 'Manager'){
    //         employee = new Manager(name, id, email, officeNumber);
    //         console.log(employee);
    //     } else if(role === 'Engineer') {
    //         employee = new Engineer(name, id, email, github);
    //         console.log(employee);
    //     } else if(role === 'Intern') {
    //         employee = new Intern(name, id, email, school);
    //         console.log(employee)
    //     } else {
    //         return employee// Refactor switch statement??
    //     };

    //     teamMembers.push(employee)
    //     // allows user to add additional team members
    //     if(addMore){
    //         return addEmployee(teamMembers);
    //     } else {
    //         return teamMembers;
    //     }
    // });

// addEmployee();


// TODO: Write function to writefile
const writeToFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`./dist/index.html`, fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'Team profile was generated'
            });
        });
    });
};

// TODO: Write function to initialize application
function init() {
    return inquirer.prompt(addEmployee)
    .then(employeeInfo => {
        
        let {role, name, id, email, github, school, officeNumber, addMore} = employeeInfo;
        let employee;

        if(role === 'Manager'){
            employee = new Manager(name, id, email, officeNumber);
            console.log(employee);
        } else if(role === 'Engineer') {
            employee = new Engineer(name, id, email, github);
            console.log(employee);
        } else if(role === 'Intern') {
            employee = new Intern(name, id, email, school);
            console.log(employee)
        } else {
            return employee// Refactor switch statement??
        };

        teamMembers.push(employee)
        // allows user to add additional team members
        if(addMore){
            return addEmployee(teamMembers);
        } else {
            return teamMembers;
        }
    });
}

// Function call to initialize app
init()
    .then(teamMembers => {
        console.log(teamMembers);
        return generateHtml(teamMembers);
    })
    .then(pageHtml => {
        return writeToFile(pageHtml);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
    })
        .catch(err => {
        console.log(err);
    });;
