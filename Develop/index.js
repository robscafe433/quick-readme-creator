// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const { log } = require('console');
const generateMarkdown = require('./utils/generateMarkdown');

//In case there are more than one prerequisites this function loops through until confirm is "no".
let prerequisites = [];
let packagesNeededForApp = [];
let tableOfContents = [];

let nonRepeatingAnswers1 = [];
let nonRepeatingAnswers2 = [];

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
            prerequisites.push(answers.prerequisite);
            if (answers.askAgain) {
                return askPrerequisite();
            } else {
                console.log(prerequisites);
                return prerequisites;
            }
        });
}
function askTableOfContents() {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'tableOfContents',
                message: 'Enter content for the table: ',
            },
            {
                type: 'confirm',
                name: 'askAgain',
                message: 'Would you like to add more content?',
                default: true,
            },
        ])
        .then((answers) => {
            tableOfContents.push(answers.tableOfContents);
            if (answers.askAgain) {
                return askTableOfContents();
            } else {
                console.log(tableOfContents);
                return tableOfContents;
            }
        });
}

function askPackagesNeededForApp() {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'packagesNeededForApp',
                message:
                    'What are the installation packages needed for app to work? Example: Inquirer? version?',
            },
            {
                type: 'confirm',
                name: 'askAgain',
                message: 'Would you like to add another installation package?',
                default: true,
            },
        ])
        .then((answers) => {
            packagesNeededForApp.push(answers.packagesNeededForApp);
            if (answers.askAgain) {
                return askPackagesNeededForApp();
            } else {
                console.log(packagesNeededForApp);
                return packagesNeededForApp;
            }
        });
}

// TODO: Create an array of questions for user input
const questionsFirstPart = [
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
    // {
    //     type: 'input',
    //     name: 'tableOfContents',
    //     message: 'Enter table of contents?',
    // },
];

const questionsSecondPart = [
    {
        type: 'input',
        name: 'usage',
        message: 'What is the usage?',
    },
    {
        type: 'input',
        name: 'license',
        message: 'What are the licenses?',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Do you wish to contribute? Enter your email:',
    },
    /// add readme.md section on tesitng, note: testing is not an input.
    // The "Tests" section in a README.md file typically provides information
    // on how to run the tests for the project.
    {
        type: 'input',
        name: 'questions',
        message: 'Have a question?',
    },
];

// TODO: Create a function to initialize app
function init() {
    inquirer
        .prompt(
            questionsFirstPart
            /* Pass your questions in here */
            //Promise
        )
        .then((answers) => {
            nonRepeatingAnswers1 = answers;
            console.log(nonRepeatingAnswers1);

            return askTableOfContents();

            //originally did not have a return in front of function call
            // and therefore was not waiting for the promise to be completed.
            // Use user feedback for... whatever!!
        })
        .then(() => {
            return askPrerequisite();
        })
        .then(() => {
            return askPackagesNeededForApp();
        })
        .then(() => {
            return inquirer.prompt(questionsSecondPart);
        })
        .then((answers) => {
            nonRepeatingAnswers2 = answers;
        })
        .then(() => {
            // I was attempting to combine all non-function-questions into one called
            // nonRepeatingAnswersAll, here is code below. However, did not work.
            // Reason: spread operator is used to unpack elements from "an array or object".
            //Not what I wanted, In this case I wanted to combine "all" key/value pairs from
            // both objects.
            // nonRepeatingAnswersAll = (...nonRepeatingAnswers1, ...nonRepeatingAnswers2)

            //To add two objects together into one the ".assign" must be used and if there are two values with same key,
            // the second value will overwrite the first. *In the below case there are two objects, each with their own key/value pairs, are
            // combined into one object with All key/value pairs.

            return {
                nonRepeatingAnswers: Object.assign(
                    {},
                    nonRepeatingAnswers1,
                    nonRepeatingAnswers2
                ),
                prerequisites,
                packagesNeededForApp,
                tableOfContents,
            };

            // let prerequisites = [];
            // let packagesNeededForApp = [];
            // let tableOfContents = [];

            // let nonRepeatingAnswers1 = [];
            // let nonRepeatingAnswers2 = [];
        })
        .then((data) => {
            return generateMarkdown(data);
        });
}

// TODO: Create a function to write README file
const writeToReadmeMD = (data) => {
    fs.writeFile('readme.md', data, (err) => {
        err ? console.error(err) : console.log('Success!!! , Log created!');
    });
};

// Function call to initialize app
init();

//still need below/

/// add readme.md section on tesitng, note: testing is not an input.
// The "Tests" section in a README.md file typically provides information
// on how to run the tests for the project.
