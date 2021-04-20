"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: "list",
        name: "generator",
        message: "Choose a generation type: ",
        choices: ["Component", "Action / User Action"]
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  finishing() {
    if (this.props.generator === "Component") {
      this.env.run("pos2:component");
    } else if (this.props.generator === "Action / User Action") {
      this.env.run("pos2:action");
    }
  }
};
