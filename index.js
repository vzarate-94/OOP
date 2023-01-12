const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "list",
      name: "color",
      message: "What is your favorite color?",
      choices: ["red", "green", "blue"]
    }
  ])
  .then(answers => {
    console.log(`Hi ${answers.name}! Your favorite color is ${answers.color}.`);
  });
  