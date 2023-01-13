const fs = require('fs');
const inquirer = require('inquirer');
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");



const teamMembers = [];
let manager;
let teamTitle;


// prompt the user for the project information.


function managerData() {
    inquirer.prompt([
        {   
            type: "input",
            message: "Team or Project Name?",
            name: "teamTitle"
        },
        {   
            type: "input",
            message: "Managers Name?",
            name: "managerName"
        },
        {   
            type: "input",
            message: "Manager's ID?",
            name: "managerID"
        },
        {   
            type: "input",
            message: "Manager's email?",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "Manager's office number?",
            name: "officeNumber"
        }]).then(managerAnswers => {
            manager = new Manager(managerAnswers.managerName, managerAnswers.managerID, managerAnswers.managerEmail, managerAnswers.officeNumber);
            teamTitle = managerAnswers.teamTitle;
            console.log("Please input employee information.")
            lesserEmployeeData();
        });
}

function lesserEmployeeData() {
    inquirer.prompt([
        {
            type: "list",
            message: "what type of Employee",
            name: "employeeRole",
            choices: ["Intern", "Engineer"]
        },

        {
            type: "input",
            message: "Employee's name?",
            name: "employeeName"
        },
        {
            type: "input",
            message: "Employee's id?",
            name: "employeeId"
        },
        {
            type: "input",
            message: "Employee's email?",
            name: "employeeEmail"
        },
        {
            type: "input",
            message: "Engineer's Github?",
            name: "github",
            when: (userInput) => userInput.employeeRole === "Engineer"
        },
        {
            type: "input",
            message: "Intern's University?",
            name: "school",
            when: (userInput) => userInput.employeeRole === "Intern"
        },
        {
            type: "confirm",
            name: "newEmployee",
            message: "Would you like to add another employee?" 
        }
    ]).then(answers => {
        
        // Pushes a new intern into the team members array
        
        if (answers.employeeRole === "Intern") {
            const employee = new Intern(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.school);
            teamMembers.push(employee);
        } else if (answers.employeeRole === "Engineer") {
            // A different way of pushing the info into teamMembers array.
            teamMembers.push(new Engineer(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.github));
        }
        if (answers.newEmployee === true) {
            lesserEmployeeData();
        } else {
            //==================
            //renderHTML
            //==================

            var main = fs.readFileSync('./dist/index.html', 'utf8');
            // The slashes and g => regular expressions (regex)
            // This allows the replace function to replace all occurances of teamTitle.
            // If I just did '{{teamTitle}}' then it only replaces the first instance.
            main = main.replace(/{{teamTitle}}/g, teamTitle);

            // Loop through the employees and print out all of their cards without replacing the previous one.
            var managerCard = fs.readFileSync('./dist/Manager.html', 'utf8');
            managerCard = managerCard.replace('{{name}}', manager.getName());
            managerCard = managerCard.replace('{{role}}', manager.getRole());
            managerCard = managerCard.replace('{{id}}', manager.getId());
            managerCard = managerCard.replace('{{email}}', manager.getEmail());
            managerCard = managerCard.replace('{{officeNumber}}', manager.getOfficeNumber());

            //=====================================================
            // Append all of the team members after manager
            //=====================================================

            var cards = managerCard; // Initial cards only has the Manager card info.
            for (var i = 0; i < teamMembers.length; i++) {
                var employee = teamMembers[i];
                // Cards adds and then equals every new employee card info.
                cards += renderEmployee(employee);
            }

            // Adds cards to main.html and outputs to team.html.
            main = main.replace('{{cards}}', cards);

            fs.writeFileSync('./dist/Output.html', main);

            // Console.log that the html has been generated
            console.log("An Output.html file was generated and put in the dists directory!");
        }
    });
}

// renderEmployee function that is called above.

function renderEmployee(employee) {
    if (employee.getRole() === "Intern") {
        var internCard = fs.readFileSync('./dist/Intern.html', 'utf8');
        internCard = internCard.replace('{{name}}', employee.getName());
        internCard = internCard.replace('{{role}}', employee.getRole());
        internCard = internCard.replace('{{id}}', employee.getId());
        internCard = internCard.replace('{{email}}', employee.getEmail());
        internCard = internCard.replace('{{school}}', employee.getSchool());
        return internCard;
    } else if (employee.getRole() === "Engineer") {
        var engineerCard = fs.readFileSync('./dist/Engineer.html', 'utf8');
        engineerCard = engineerCard.replace('{{name}}', employee.getName());
        engineerCard = engineerCard.replace('{{role}}', employee.getRole());
        engineerCard = engineerCard.replace('{{id}}', employee.getId());
        engineerCard = engineerCard.replace('{{email}}', employee.getEmail());
        engineerCard = engineerCard.replace('{{github}}', employee.getGithub());
        return engineerCard;
    }
}

managerData();
