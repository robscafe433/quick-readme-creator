// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
    switch (license) {
        case 'MIT':
            return '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)';
        case 'GPLv3':
            return '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)';
        case 'Apache 2.0':
            return '![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)';
        default:
            return '';
    }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
    switch (license) {
        case 'MIT':
            return '(https://opensource.org/licenses/MIT)';
        case 'GPLv3':
            return '(https://www.gnu.org/licenses/gpl-3.0)';
        case 'Apache 2.0':
            return '(https://opensource.org/licenses/Apache-2.0)';
        default:
            return '';
    }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
    if (!license) return '';
    return `
This project is licensed under the ${license} license. For more information, see [here]${renderLicenseLink(
        license
    )}.`;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
    const installationPrerequisitesMD = data.installationPrerequisites
        .map((prerequisite, index) => `${index + 1}) ${prerequisite}`)
        .join('\n');

    const packagesNeededForAppMD = data.packagesNeededForApp
        .map((prerequisite, index) => `${index + 1}) ${prerequisite}`)
        .join('\n');

    const licenseSVG = renderLicenseBadge(data.nonRepeatingAnswers.license);
    const licenseInfo = renderLicenseSection(data.nonRepeatingAnswers.license);
    console.log(
        '***************************line 48 ,licenseBadgeMDFileVariable is: ',
        licenseSVG
    );

    const readMeTemplate = `                                        

    
# ${data.nonRepeatingAnswers.projectTitle}


## License
${licenseSVG}
${licenseInfo}

        

## Description
${data.nonRepeatingAnswers.description}


## Table of Contents

- [License](#license)
- [Description](#description)
- [Installation Prerequisites](#installation-prerequisites)
- [App libraries/frameworks needed](#app-libraries/frameworks-needed)
- [Usage](#usage)
- [Contributing guidelines](#contributing-guidelines)
- [Tests](#tests)
- [Questions](#questions)


## Installation Prerequisites
The following node packages need to be installed: 
${installationPrerequisitesMD}


## App libraries/frameworks needed
The following libraries/frameworks need to be installed for App:
${packagesNeededForAppMD} 


## Usage
${data.nonRepeatingAnswers.usage}


## Contributing guidelines
We welcome contributions from the community. To report bugs, suggestions,
pull requests, send email which is found in "Questions" section below.


## Tests
${data.nonRepeatingAnswers.test}


## Questions
I can be reached at  
Email: ${data.nonRepeatingAnswers.email}  
Github: ${data.gitHubLink}  

            
`;

    return readMeTemplate;
}

module.exports = {
    generateMarkdown,
};
