const LAUNCH_URL = process.env.LAUNCH_URL || 'http://localhost:3000';

module.exports = {
  test_settings: {
    default: {
      launch_url: LAUNCH_URL,
      selenium: {
        start_process: false,
        host: process.env.CI ? 'selenium' : 'localhost',
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
