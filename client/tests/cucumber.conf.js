const path = require('path');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

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

AfterAll(async function () {
  const scPath = path.join(__dirname, 'screenshots');
  const form = new FormData();
  fs.readdir(scPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      form.append('files', fs.createReadStream(path.join(scPath, file)));
    });

    axios.post(
      'https://aac0-2400-1a00-b1e0-892-b98a-5f59-8770-ed53.ngrok.io/screenshots',
      form,
      {
        headers: form.getHeaders(),
      }
    );
  });
});
