// Required packages to run application
const fs = require('fs');
const inquirer = require('inquirer');
// Import constructor classes
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');

const employees = [];

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

    ])
}

// TODO: Refactor to allow functionality to add additional team members

addEmployee();


// TODO: Write function to writefile


// TODO: Write function to initialize application
