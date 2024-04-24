"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const templateMarkdown_1 = require("./utils/templateMarkdown");
Object.defineProperty(exports, "fillMarkdownVariables", {
  enumerable: true,
  get: function () {
    return templateMarkdown_1.fillMarkdownVariables;
  },
});
Object.defineProperty(exports, "createMarkdownFile", {
  enumerable: true,
  get: function () {
    return templateMarkdown_1.createMarkdownFile;
  },
});
const getGithubUsername_1 = require("./utils/getGithubUsername");
const getCurrentDateString_1 = require("./utils/getCurrentDateString");
Object.defineProperty(exports, "getCurrentDateString", {
  enumerable: true,
  get: function () {
    return getCurrentDateString_1.getCurrentDateString;
  },
});
const filePath_1 = require("./filePath");

function main() {
  const username = (0, getGithubUsername_1.getGithubUsername)();
  const templatePath = filePath_1.TEMPLATE_PATH;
  const dateString = (0, getCurrentDateString_1.getCurrentDateString)();

  const config = {
    username,
    dateString,
    template: templatePath.split("template")[1] || "markdown.md",
  };
  // 💾 Save md file
  (0, templateMarkdown_1.createMarkdownFile)(config, templatePath);
}

main();
