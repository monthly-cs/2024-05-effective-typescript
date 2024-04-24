"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_FILE_PATH = exports.TEMPLATE_PATH = void 0;
const path_1 = __importDefault(require("path"));
exports.TEMPLATE_PATH = path_1.default.join(
  __dirname,
  "../template",
  "markdown.md"
);
