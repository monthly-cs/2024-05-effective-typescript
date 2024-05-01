"use strict";
/** Function to get git username 🕵️‍♀️ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGithubUsername = void 0;
const child_process_1 = require("child_process");
const getGithubUsername = () => {
  const gitUrl = (0, child_process_1.execSync)("git config --get user.email")
    .toString()
    .trim();
  const githubId = gitUrl.split("@")[0].split("+")[1];
  return githubId;
};
exports.getGithubUsername = getGithubUsername;
