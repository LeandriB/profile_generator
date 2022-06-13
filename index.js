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
            message: 'What is the managers name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the Managers name!");
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the managers id? (Required)',
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log("Please enter the Managers ID!");
                }
            }, 
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the managers email? (Required)',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log("Please enter the Managers email!");
                }
            } 
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the managers office number? (Required)',
            validate: numberInput => {
                if (numberInput) {
                    return true;
                } else {
                    console.log("Please enter the Managers office number!");
                }
            }
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

        if (role === 'Engineer') {
            const engineer = new Engineer(name, id, email, github);
            console.log(engineer);
            teamMembers.push(engineer);

        } else if (role === 'Intern') {
            const intern = new Intern(name, id, email, school);
            console.log(intern)
            teamMembers.push(intern);
        } 

        // teamMembers.push(employee)

        if (addMore) {
            addEmployee(teamMembers);
        } else {
            return teamMembers;
            // writeToFile(); // ERROR
        }
        console.log(teamMembers)
    });
}


// TODO: Write function to writefile
const writeToFile = (data) => {
    // console.log(data, 'test');
        fs.writeFile(`./dist/index.html`, generateHtml(data), err => {
            if (err) {
                return;
            }
        });
};

// Write function to initialize application
function init() {
    addManager()
    .then(teamMembers => {
        return teamMembers;
    })
    .then(pageHTML => {
        return writeToFile(pageHTML);
    }).catch(err => {
        console.log(err);
    });
}

// Function call to initialize app
init();
