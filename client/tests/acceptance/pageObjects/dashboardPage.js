const { format } = require('util');

module.exports = {
  url: function () {
    return this.api.launchUrl + '/dashboard';
  },
  commands: [
    {
      isDashboardPage: async function () {
        let result = false;
        await this.waitForElementVisible('@dashboardHeader', (res) => {
          result = res.value;
        });
        return result;
      },
      logOut: function (username) {
        const userActionsEl = {
          selector: this.getUserMenuEl(username),
          locateStrategy: 'xpath',
        };
        return this.waitForElementVisible(userActionsEl)
          .click(userActionsEl)
          .waitForElementVisible('@logOutBtn')
          .click('@logOutBtn');
      },
      createProject: function (projectName) {
        return this.waitForElementVisible('@createProjectIcon')
          .click('@createProjectIcon')
          .waitForElementVisible('@projectNameInput')
          .setValue('@projectNameInput', projectName)
          .click('@createProjectBtn');
      },
      openProject: function (projectName) {
        const projectEl = {
          selector: this.getProjectNameEl(projectName),
          locateStrategy: 'xpath',
        };
        return this.waitForElementVisible(projectEl).click(projectEl);
      },
      getUserMenuEl: function (username) {
        return format(this.elements.userMenu.selector, username);
      },
      getProjectNameEl: function (projectName) {
        return format(
          this.elements.dashboardProjectTitle.selector,
          projectName
        );
      },
    },
  ],
  elements: {
    dashboardProjectTitle: {
      selector: '//div[@class="Projects_openTitle__1yQ-Y" and text()="%s"]',
    },
    dashboardHeader: {
      selector: '//div[@class="Header_wrapper__3tGRg"]/a[text()="Planka"]',
      locateStrategy: 'xpath',
    },
    logOutBtn: {
      selector: '//a[contains(@class,"item") and text()="Log Out"]',
      locateStrategy: 'xpath',
    },
    userMenu: {
      selector: '//a[contains(@class,"item") and text()="%s"]',
    },
    projectNameInput: {
      selector: 'input[name="name"]',
    },
    createProjectIcon: {
      selector: '//div[contains(@class,"Projects_addTitleWrapper")]',
      locateStrategy: 'xpath',
    },
    createProjectBtn: {
      selector: '//button[text()="Create project"]',
      locateStrategy: 'xpath',
    },
  },
};
