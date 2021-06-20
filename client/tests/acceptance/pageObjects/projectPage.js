const { format } = require('util');

module.exports = {
  url: function () {
    return this.api.launchUrl + '/projects';
  },
  commands: [
    {
      isBackgroundPurple: async function () {
        let result = false;
        await this.isVisible('@purpleBg', (res) => {
          result = res.value;
        });
        return result;
      },
      deleteProject: function (projectName) {
        return this.openProjectActions()
          .waitForElementVisible('@deleteProject')
          .click('@deleteProject')
          .waitForElementVisible('@confirmDeleteBtn')
          .click('@confirmDeleteBtn');
      },
      renameProject: function (projectName) {
        return this.openProjectActions()
          .waitForElementVisible('@editProjectTitle')
          .click('@editProjectTitle')
          .waitForElementVisible('@projectTitleInput')
          .setValue('@projectTitleInput', projectName)
          .waitForElementVisible('@saveTitleBtn')
          .click('@saveTitleBtn');
      },
      changeProjectBg: function () {
        return this.openProjectActions()
          .waitForElementVisible('@editProjectBackground')
          .click('@editProjectBackground')
          .waitForElementVisible('@purpleBgBtn')
          .click('@purpleBgBtn');
      },
      createProjectBoard: function (boardName) {
        return this.waitForElementVisible('@addBoardIcon')
          .click('@addBoardIcon')
          .waitForElementVisible('@projectBoardInputField')
          .setValue('@projectBoardInputField', boardName)
          .waitForElementVisible('@createBoardBtn')
          .click('@createBoardBtn');
      },
      openProjectActions: function () {
        return this.waitForElementVisible('@projectHeader').click(
          '@projectHeader'
        );
      },
      isProjectBoardExists: async function (boardName) {
        let result = false;
        const projectBoardEl = {
          selector: this.getProjectBoardEl(boardName),
          locateStrategy: 'xpath',
        };
        await this.isVisible(projectBoardEl, (res) => {
          result = res.value;
        });
        return result;
      },
      getProjectBoardEl: function (boardName) {
        return format(this.elements.projectBoardTab.selector, boardName);
      },
    },
  ],
  elements: {
    purpleBg: {
      selector: 'div[class*=styles_backgroundPurpleRose]',
    },
    purpleBgBtn: {
      selector: 'button[class*=styles_backgroundPurpleRose]',
    },
    editProjectBackground: {
      selector:
        '//a[contains(@class,"ActionsPopup_menuItem__K6RRF") and text()="Edit Background"]',
      locateStrategy: 'xpath',
    },
    projectTitleInput: {
      selector: 'div[class*=NameEditStep_field] input',
    },
    editProjectTitle: {
      selector:
        '//a[contains(@class,"ActionsPopup_menuItem__K6RRF") and text()="Edit Title"]',
      locateStrategy: 'xpath',
    },
    saveTitleBtn: {
      selector: '//button[text()="Save"]',
      locateStrategy: 'xpath',
    },
    projectHeader: {
      selector: '.Project_header__3Ldu9 .Project_name__2zTTZ',
    },
    deleteProject: {
      selector: '//a[contains(@class,"item") and text()="Delete Project"]',
      locateStrategy: 'xpath',
    },
    confirmDeleteBtn: {
      selector: '//button[text()="Delete project"]',
      locateStrategy: 'xpath',
    },
    addBoardIcon: {
      selector: 'button[class*=Boards_addButton]',
    },
    projectBoardInputField: {
      selector: 'div[class*=AddPopup_field] input',
    },
    createBoardBtn: {
      selector: '//button[text()="Create board"]',
      locateStrategy: 'xpath',
    },
    projectBoardTab: {
      selector: '//a[contains(@class, "Boards_link") and text()="%s"]',
      locateStrategy: 'xpath',
    },
  },
};
