"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  initializing() {
    this.log(
      yosay(
        `The generator does nothing by itself. Please, run ${chalk.bold(
          "yo pos2:component"
        )}, ${chalk.bold("yo pos2:useraction")} or ${chalk.bold(
          "yo pos2:stateaction"
        )}`
      )
    );
  }
};
