const path = require('path');
const {
  setDefaultTimeout,
  After,
  Before,
  AfterAll,
  BeforeAll,
} = require('@cucumber/cucumber');
const {
  createSession,
  closeSession,
  startWebDriver,
} = require('nightwatch-api');
const {
  deleteTestUsers,
  deleteTestProjects,
} = require('./acceptance/helpers/apiHelpers');

startWebDriver({ configFile: path.join(__dirname, 'nightwatch.conf.js') });
setDefaultTimeout(60000);

BeforeAll(async function () {});

// runs before each scenario
Before(async function () {
  console.log('starting...');
  await createSession();
});

// runs after each scenario
After(async function () {
  await deleteTestProjects();
  await deleteTestUsers();
  await closeSession();
});

AfterAll(async function () {});
