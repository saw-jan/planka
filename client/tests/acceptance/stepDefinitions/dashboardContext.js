const { Given, When, Then } = require('@cucumber/cucumber');
const { client } = require('nightwatch-api');
const assert = require('assert');

const dashboardPage = client.page.dashboardPage();

Given('the user has opened project {string}', function (projectName) {
  return dashboardPage.openProject(projectName);
});

When(
  'the user creates a project with name {string} using the webUI',
  function (projectName) {
    return dashboardPage.createProject(projectName);
  }
);

Then('the user should be in dashboard page', async function () {
  const isDashboard = await dashboardPage.isDashboardPage();
  assert.strictEqual(
    isDashboard,
    true,
    'Expected to see dashboard page but not visible'
  );
});
