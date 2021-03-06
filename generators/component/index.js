"use strict";
const Generator = require("yeoman-generator");
const camelCase = require("camelcase");

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: "number",
        message: "Enter the copyright year",
        name: "copyrightYear",
        default: new Date().getFullYear()
      },
      {
        type: "input",
        name: "componentName",
        message: "Component name: ",
        transformer(val) {
          return camelCase(val, { pascalCase: true });
        }
      },
      {
        type: "input",
        name: "componentDescription",
        message: "Description: ",
        default: ""
      },
      {
        type: "confirm",
        name: "generateTests",
        message: "Should we generate tests?",
        default: true
      },
      {
        type: "confirm",
        name: "generateSCSS",
        message: "Should we generate a SCSS file?",
        default: true
      },
      {
        type: "confirm",
        name: "generateStory",
        message: "Should we generate a storybook?",
        default: true
      },
      {
        type: "input",
        name: "storyTitle",
        message: "Story title: ",
        default: answers => answers.componentName,
        when: answers => answers.generateStory
      },
      {
        type: "input",
        name: "path",
        message: "Path: ",
        default: "src/components"
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
        transform: val => val.toUpperCase()
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.lowercasedPrefix = this.props.prefix.toLowerCase();
    });
  }

  writing() {
    const destinationPath = this.destinationPath(
      `${this.props.path}/${this.props.componentName}`
    );

    const componentPath = `${destinationPath}/${this.props.componentName}.jsx`;
    const indexPath = `${destinationPath}/index.js`;
    const sassFilePath = `${destinationPath}/${this.props.componentName}.scss`;
    const testPath = `${destinationPath}/__test__/${this.props.componentName}.test.jsx`;
    const storyPath = `${destinationPath}/stories/${this.props.componentName}.stories.jsx`;
    const storySassPath = `${destinationPath}/stories/${this.props.componentName}Stories.scss`;

    this.log(`Creating ${componentPath}`);
    this.fs.copyTpl(
      this.templatePath("component.txt"),
      this.destinationPath(componentPath),
      this.props
    );

    this.log(`Creating ${indexPath}`);
    this.fs.copyTpl(
      this.templatePath("index.txt"),
      this.destinationPath(indexPath),
      this.props
    );

    if (this.props.generateSCSS) {
      this.log(`Creating ${sassFilePath}`);
      this.fs.copyTpl(
        this.templatePath("sassfile.txt"),
        this.destinationPath(sassFilePath),
        this.props
      );
    }

    if (this.props.generateTests) {
      this.log(`Creating ${testPath}`);
      this.fs.copyTpl(
        this.templatePath("test.txt"),
        this.destinationPath(testPath),
        this.props
      );
    }

    if (this.props.generateStory) {
      this.log(`Creating ${storyPath}`);
      this.fs.copyTpl(
        this.templatePath("story.txt"),
        this.destinationPath(storyPath),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath("storysassfile.txt"),
        this.destinationPath(storySassPath),
        this.props
      );
    }
  }
};
