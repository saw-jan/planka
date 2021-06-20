module.exports = {
  url: function () {
    return this.api.launchUrl + '/login';
  },
  commands: {
    isLoginPage: async function () {
      let result = false;
      await this.waitForElementVisible('@loginTitle', (res) => {
        result = res.value;
      });
      return result;
    },
    logIn: function (username, password) {
      return this.waitForElementVisible('@emailInput')
        .setValue('@emailInput', username)
        .waitForElementVisible('@passwordInput')
        .setValue('@passwordInput', password)
        .waitForElementVisible('@loginBtn')
        .click('@loginBtn');
    },
    getErrorMsg: async function () {
      let errorMessage;
      await this.waitForElementVisible('@errorMessage').getText(
        '@errorMessage',
        (result) => {
          errorMessage = result.value;
        }
      );
      return errorMessage;
    },
  },
  elements: {
    errorMessage: {
      selector: '.error p',
    },
    loginTitle: {
      selector: '.Login_formTitle__3nnK9',
    },
    emailInput: {
      selector: 'input[name=emailOrUsername]',
    },
    passwordInput: {
      selector: 'input[name=password]',
    },
    loginBtn: {
      selector: '.field > button',
    },
  },
};
