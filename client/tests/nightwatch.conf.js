const path = require('path');
const LAUNCH_URL = process.env.LAUNCH_URL || 'http://localhost:3000';
console.log(process.env.DRONE);
console.log(typeof process.env.DRONE);
const SELENIUM_HOST = process.env.DRONE === 'true' ? 'selenium' : 'localhost';

module.exports = {
  page_objects_path: path.join(__dirname, 'acceptance', 'pageObjects'),
  globals_path: path.join(__dirname, 'acceptance', 'helpers', 'globals.js'),
  screenshots: {
    enabled: true,
    path: './screenshots',
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
