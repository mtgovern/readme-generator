const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const generateMarkdown = require("./utils/generateMarkdown.js");
const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
    {
        type: "input",
        name: "username",
        message: "Enter your GitHub Username?"
      },
        {
          type: "input",
          name: "badge",
          message: "Enter at least one badge"
        },
        {
          type: "input",
          name: "title",
          message: "What is your project title?"
        },
        {
          type: "input",
          name: "description",
          message: "What is your description?"
        },
        {
          type: "input",
          name: "contents",
          message: "What is your table of contents?"
        },
        {
          type: "input",
          name: "installation",
          message: "What is your installation"
        },
        {
          type: "input",
          name: "license",
          message: "What is your license"
        },
        {
          type: "input",
          name: "contributing",
          message: "What are you contributing?"
        },
        {
          type: "input",
          name: "tests",
          message: "Enter tests."
        }
];

//Writes to the README.md
function writeToFile(fileName, data) {
    const readme = generateMarkdown(data);
    writeFileAsync(fileName, readme);
};

//Initialize with questions to user
function init() {
    inquirer
    .prompt(questions)
    .then(function (input) {
        // console.log(answers);

        return input;
    })

    .then(function (inquirerAnswers) {
      const queryUrl = `https://api.github.com/users/${inquirerAnswers.username}`;
      axios.get(queryUrl)
            .then(function (response) {
              console.log(response.data);
                console.log(inquirerAnswers);

                response.data.title = inquirerAnswers.title; 
                response.data.description = inquirerAnswers.description; 
                response.data.contents = inquirerAnswers.contents; 
                response.data.installation = inquirerAnswers.installation;  
                response.data.usage = inquirerAnswers.usage; 
                response.data.license = inquirerAnswers.license; 
                response.data.contributing = inquirerAnswers.contributing; 
                response.data.tests = inquirerAnswers.tests; 
                response.data.username = inquirerAnswers.username; 
                response.data.badge = inquirerAnswers.badge; 
               
                writeToFile("readme.md", response.data); // Writes to READme.md file
            })
            .then(function () {
                console.log(`Successfully wrote to README.md`);
            })
            .catch(function (error) {
                console.log("Please enter a valid Github username", error);
                return;
            });
    });
};

//Starts the process
init();
