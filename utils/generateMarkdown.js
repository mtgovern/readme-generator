function generateMarkdown(data) {
  console.log(data);
  return `
# ${data.title}

* Badges: ${data.badge}
* Project title: ${data.title}
* Description: ${data.description}
* Table of Contents: ${data.contents}
* Installation: ${data.installation}
* Usage: ${data.usage}
* License: ${data.license}
* Contributing: ${data.contributing}
* Tests: ${data.tests}
* Questions: ${data.questions}
  * User GitHub profile picture
  * User GitHub email

`;
}

module.exports = generateMarkdown;
