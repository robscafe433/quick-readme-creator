// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

//In case there are more than one prerequisites this function loops through until confirm is "no".
let prerequisites = [];

// function that asks for prerequisite packages, example: node / npm

function askPrerequisite() {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'prerequisite',
                message:
                    'What are the installation prerequisites? Example: npm',
            },
            {
                type: 'confirm',
                name: 'askAgain',
                message:
                    'Would you like to add another installation prerequisite?',
                default: true,
            },
        ])
        .then((answers) => {
            askPrerequisite.push(answers.prerequisite);
            if (answers.askAgain) {
                return askPrerequisite();
            } else {
                return prerequisites;
            }
        });
}

function askPackagesNeededForApp() {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'prerequisite',
                message:
                    'What are the installation prerequisites? Example: Node.js? version?',
            },
            {
                type: 'confirm',
                name: 'askAgain',
                message:
                    'Would you like to add another installation prerequisite?',
                default: true,
            },
        ])
        .then((answers) => {
            prerequisites.push(answers.prerequisite);
            if (answers.askAgain) {
                return askPrerequisite();
            } else {
                return prerequisites;
            }
        });
}

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'projectTitle',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'What is the description?',
    },
    {
        type: 'input',
        name: 'tableOfContents',
        message: 'Enter table of contents?',
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
