// Create page layout for team cards
const generateTeam = function(team) {   
    return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">
    </head>
    <body>
        <header>
            <nav class="navbar" id="navbar">
                <span class="navbar-brand mb-0 h1 w-100 text-center" id="navbar-text">My Team</span>
            </nav>
        </header>
        <main>
            <div class="container">
                <div class="row justify-content-center" id="team-cards">
                    <!--Team Cards-->
                    ${team}
                </div>
            </div>
        </main>
        
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    </html>
`};

// Create card for Manager
const generateManager = function(manager) {
        return `
            <div class="col-4 mt-4">
                <div class="card h-100">
                    <div class="card-header">
                        <h3>${manager.name}</h3>
                        <h4>Manager</h4><i class="bi bi-cup"></i>
                    </div>
                    <div class="card-body">
                        <p class="id">ID: ${manager.id}</p>
                        <p class="email">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
                        <p class="office">Office Number: ${manager.officeNumber}</p>
                    </div>
                </div>
            </div>
        `;
    // }
}

// Create card for Engineer
const generateEngineer = function(engineer) {
        return `
            <div class="col-4 mt-4">
                <div class="card h-100">
                    <div class="card-header">
                        <h3>${engineer.name}</h3>
                        <h4>Engineer</h4><i class="bi bi-laptop"></i>
                    </div>
                    <div class="card-body">
                        <p class="id">ID: ${engineer.id}</p>
                        <p class="email">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
                        <p class="github">Github: <a href="https://github.com/${engineer.github}">${engineer.github}</a></p>
                    </div>
                </div>
            </div>
        `
    // }
}

// Create card for Intern
const generateIntern = function(intern) {
        return `
            <div class="col-4 mt-4">
                <div class="card h-100">
                    <div class="card-header">
                        <h3>${intern.name}</h3>
                        <h4>Intern</h4><i class="bi bi-book"></i>
                    </div>
                    <div class="card-body">
                        <p class="id">ID: ${intern.id}</p>
                        <p class="email">Email:<a href="mailto:${intern.email}">${intern.email}</a></p>
                        <p class="school">School: ${intern.school}</p>
                    </div>
            </div>
        </div>
        `
};

// Functionality to build page
const generateHtml = (teamData) => {
    teamMembers = []; 

    for (let i = 0; i < teamData.length; i++) {
            const employee = teamData[i];
            const role = employee.getRole(); 


        // Call manager function
        if (role === 'Manager') {
            const manager = generateManager(employee);
            teamMembers.push(manager);
        }

        // Call engineer function
        if (role === 'Engineer') {
            const engineer = generateEngineer(employee);

            teamMembers.push(engineer);
        }

        // Call intern function 
        if (role === 'Intern') {
            const intern = generateIntern(employee);

            teamMembers.push(intern);
        }
        
    }

    const teamCards = teamMembers.join('')

   // Returns generated HTML page
    return generateTeam(teamCards); 
    
}

module.exports = generateHtml;