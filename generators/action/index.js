"use strict";
const Generator = require("yeoman-generator");
const camelCase = require("camelcase");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.

    const prompts = [
      {
        type: "number",
        name: "copyrightYear",
        message: "Copyright Year: ",
        default: new Date().getFullYear()
      },
      {
        type: "input",
        name: "path",
        message: "Path: ",
        default: "src/model/user-interface"
      },
      {
        type: "input",
        name: "actionName",
        message: "Action name: ",
        transform(val) {
          return camelCase(val);
        }
      },
      {
        type: "input",
        name: "package",
        message: "Module package: ",
        default: "org.openbravo.core2"
      },
      {
        type: "input",
        name: "prefix",
        message: "Module prefix: ",
        default: "OBC2",
        transform(val) {
          return val.toUpperCase();
        }
      },
      {
        type: "input",
        name: "description",
        message: "Description: ",
        default: ""
      },
      {
        type: "list",
        name: "modelName",
        message: "Model: ",
        choices: ["UI", "Global", "Ticket", "Cashup", "Session"]
      },
      {
        type: "confirm",
        name: "generateUserAction",
        message: "Should generate user action?",
        default: true
      },
      {
        type: "confirm",
        name: "generateTests",
        message: "Should generate tests?",
        default: true
      },
      {
        type: "list",
        name: "userActionType",
        message: "User Action Type: ",
        choices: ["UIAction", "StateUserAction", "WindowSwitchAction"],
        when: answers => answers.generateUserAction
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.actionNamePascalCase = camelCase(this.props.actionName, {
        pascalCase: true
      });
    });
  }

  writing() {
    const destinationPath = this.destinationPath(`${this.props.path}`);
    const actionPath = `${destinationPath}/actions/${this.props.actionNamePascalCase}.js`;
    const userActionPath = `${destinationPath}/user-actions/${this.props.actionNamePascalCase}.js`;
    const actionTestPath = `${destinationPath}/__test__/${this.props.actionName}.test.js`;
    const userActionTestPath = `${destinationPath}/__test__/${this.props.actionNamePascalCase}UserAction.test.js`;

    this.log(`Creating ${actionPath}`);
    this.fs.copyTpl(
      this.templatePath("action.txt"),
      this.destinationPath(actionPath),
      this.props
    );

    if (this.props.generateUserAction) {
      this.log(`Creating ${userActionPath}`);
      this.fs.copyTpl(
        this.templatePath("userAction.txt"),
        this.destinationPath(userActionPath),
        this.props
      );
    }

    if (this.props.generateTests) {
      this.log(`Creating ${actionTestPath}`);
      this.fs.copyTpl(
        this.templatePath("actionTest.txt"),
        this.destinationPath(actionTestPath),
        this.props
      );

      this.log(`Creating ${userActionTestPath}`);
      this.fs.copyTpl(
        this.templatePath("userActionTest.txt"),
        this.destinationPath(userActionTestPath),
        this.props
      );
    }
  }
};
