// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const { log } = require('console');

const { generateMarkdown } = require('./utils/generateMarkdown');

const writeToReadmeMD = (data) => {
    fs.writeFile('README.md', data, (err) => {
        err ? console.error(err) : console.log('Success!!! , Log created!');
    });
};

//In case there are more than one prerequisites this function loops through until confirm is "no".
let installationPrerequisites = [];
let packagesNeededForApp = [];
// let tableOfContents = [];

let nonRepeatingAnswers1 = [];
let nonRepeatingAnswers2 = [];

let gitHubLink = '';

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
            installationPrerequisites.push(answers.prerequisite);
            if (answers.askAgain) {
                return askPrerequisite();
            } else {
                return installationPrerequisites;
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
                return packagesNeededForApp;
            }
        });
}

function gitubProfileLink(githubName) {
    gitHubLink = `https://github.com/${username}`;
}

// TODO: Create an array of questions for user input
const questionsFirstPart = [
    {
        type: 'input',
        name: 'projectTitle',
        message: 'What is the title of your project?',
    },
    // description section: The purpose of a description in a README.md file is
    //to provide a clear, concise summary of the project.
    //It should explain what the project does, its features,
    // and possibly what problems it solves or its intended use.
    //The description helps users, contributors,
    //and potential users to quickly understand the
    //essence of the project and what it can do for them.
    {
        type: 'input',
        name: 'description',
        message: 'Description',
    },
];

const questionsSecondPart = [
    {
        type: 'input',
        name: 'usage',
        message: 'What is the usage?',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license:',
        choices: ['MIT', 'GPLv3', 'Apache 2.0'],
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter email to be reached for questions:',
    },
    {
        type: 'input',
        name: 'test',
        message: 'Tests:',
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

            return inquirer.prompt({
                type: 'input',
                name: 'gitHubUserName',
                message: 'What is your github user name?',
            });
        })
        .then((answer) => {
            gitHubLink = `https://github.com/${answer.gitHubUserName}`;
        })
        .then(() => {
            console.log('After gitHubProfileLink, and link is: ', gitHubLink);
            // I was attempting to combine all non-function-questions into one called
            // nonRepeatingAnswersAll, here is code below.

            // nonRepeatingAnswersAll = (...nonRepeatingAnswers1, ...nonRepeatingAnswers2)

            // However, did not work.
            // Reason: spread operator is used to unpack elements from "an array or object".
            //Not what I wanted, In this case I wanted to combine "all" key/value pairs from
            // both objects.

            //To add two objects together into one the ".assign" must be used and if there are two values with same key,
            // the second value will overwrite the first. *In the below case there are two objects, each with their own key/value pairs, are
            // combined into one object with All key/value pairs.

            return {
                nonRepeatingAnswers: Object.assign(
                    {},
                    nonRepeatingAnswers1,
                    nonRepeatingAnswers2
                ),
                installationPrerequisites,
                packagesNeededForApp,
                gitHubLink,
            };
        })
        .then((data) => {
            console.log('Here is the data >>>>>>>>>>', data);
            return generateMarkdown(data);
        })
        .then((data) => {
            // TODO: Create a function to write README file
            writeToReadmeMD(data);
        });
}

// Function call to initialize app
init();

//still need below/

/// add readme.md section on tesitng, note: testing is not an input.
// The "Tests" section in a README.md file typically provides information
// on how to run the tests for the project.
