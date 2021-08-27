const path = require('path');
const LAUNCH_URL = process.env.LAUNCH_URL || 'http://localhost:3000';
const SELENIUM_HOST = process.env.DRONE === 'true' ? 'selenium' : 'localhost';

module.exports = {
  page_objects_path: path.join(__dirname, 'acceptance', 'pageObjects'),
  globals_path: path.join(__dirname, 'acceptance', 'helpers', 'globals.js'),
  screenshots: {
    enabled: true,
    path: path.join(__dirname, 'screenshots'),
    on_failure: true,
    on_error: true,
  },
  test_settings: {
    default: {
      launch_url: LAUNCH_URL,
      selenium: {
        start_process: false,
        host: SELENIUM_HOST,
        port: 4444,
      },
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: [
            'headless',
            'disable-gpu',
            'disable-dev-shm-usage',
            'ignore-certificate-errors',
          ],
          w3c: false,
        },
      },
    },
  },
};
