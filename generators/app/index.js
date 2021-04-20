"use strict";
const Generator = require("yeoman-generator");

var yeoman = require("yeoman-environment");
var env = yeoman.createEnv();
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
    let namespace = "";
    if (this.props.generator === "Component") {
      namespace = ":component";
    } else if (this.props.generator === "Action / User Action") {
      namespace = ":action";
    }

    const generator = env.create(`pos-2${namespace}`);
    generator.run();
  }
};
