const { Given, When, Then } = require('@cucumber/cucumber');
const { client } = require('nightwatch-api');
const { createUser } = require('../helpers/apiHelpers');
const assert = require('assert');

const loginPage = client.page.loginPage();
const dashboardPage = client.page.dashboardPage();

Given('user has browsed to the login page', function () {
  return loginPage.navigate();
});

Given('the following users has been created:', async function (dataTable) {
  const users = dataTable.hashes();
  let result;
  for (const user of users) {
    result = await createUser(user);
  }
  assert.strictEqual(result, true, 'Cannot create user');
});

Given(
  'the user has logged in with email {string} and password {string}',
  async function (email, password) {
    await loginPage.navigate();
    await loginPage.logIn(email, password);
    const isDashboard = await dashboardPage.isDashboardPage();
    assert.strictEqual(
      isDashboard,
      true,
      'Expected to see dashboard page but not visible'
    );
  }
);

When(
  'user logs in with username/email {string} and password {string} using the webUI',
  function (username, password) {
    return loginPage.logIn(username, password);
  }
);

When('user {string} logs out using the webUI', function (username) {
  return dashboardPage.logOut(username);
});

Then(
  'error message {string} should be displayed in the webUI',
  async function (errorMessage) {
    const actualErrorMsg = await loginPage.getErrorMsg();
    assert.strictEqual(
      actualErrorMsg,
      errorMessage,
      'Error message does not match'
    );
  }
);

Then('the user should be in the login page', async function () {
  const isLoginPage = await loginPage.isLoginPage();
  assert.strictEqual(isLoginPage, true, 'Expected to be in login Page but not');
});
