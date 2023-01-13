const firstEl = document.getElementById("hello")

firstEl.innerHTML = "hello Puta"

const inquirer = require("inquirer");

const NameEl = document.getElementById("inputName")

const phraseEl = document.getElementById("inputPhrase")

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