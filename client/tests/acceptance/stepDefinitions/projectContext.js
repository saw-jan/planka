const { Given, When, Then } = require('@cucumber/cucumber');
const { client } = require('nightwatch-api');
const { createProject } = require('../helpers/apiHelpers');
const assert = require('assert');

const projectPage = client.page.projectPage();

Given(
  'user {string} has created the following projects:',
  async function (user, dataTable) {
    const projects = dataTable.hashes();
    let result;
    for (const project of projects) {
      result = await createProject(user, project);
    }
    assert.strictEqual(result, true, 'Cannot create project');
  }
);

When(
  'the user deletes a project {string} using the webUI',
  function (projectName) {
    return projectPage.deleteProject(projectName);
  }
);

When(
  'the user renames the project to {string} using the webUI',
  function (projectName) {
    return projectPage.renameProject(projectName);
  }
);

When('the user changes background to purple using the webUI', function () {
  return projectPage.changeProjectBg();
});

When(
  'the user creates a new project board {string} using the webUI',
  function (boardName) {
    return projectPage.createProjectBoard(boardName);
  }
);

Then(
  'the project title should be renamed to {string}',
  async function (newProjectName) {
    let actualTitle = '';
    await projectPage.getText('@projectHeader', (result) => {
      actualTitle = result.value;
    });
    assert.strictEqual(
      actualTitle,
      newProjectName,
      `Expected to project title to be ${newProjectName} but was ${actualTitle}`
    );
  }
);

Then(
  'the created project {string} should be opened',
  async function (projectName) {
    let actualTitle = '';
    await projectPage.getText('@projectHeader', (result) => {
      actualTitle = result.value;
    });
    assert.strictEqual(
      actualTitle,
      projectName,
      `Expected to open project ${projectName} but was ${actualTitle}`
    );
  }
);

Then('the project background should be purple', async function () {
  const isBackgroundPurple = await projectPage.isBackgroundPurple();
  assert.strictEqual(
    isBackgroundPurple,
    true,
    'Expected background to be purple but is not'
  );
});

Then('the project board {string} should exist', async function (boardName) {
  const isProjectBoardExists = await projectPage.isProjectBoardExists(
    boardName
  );
  assert.strictEqual(
    isProjectBoardExists,
    true,
    'Expected project board to be created but does not'
  );
});
