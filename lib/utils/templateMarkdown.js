"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMarkdownFile = exports.fillMarkdownVariables = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/** Function to fill the template with dynamic data ✨ */
const fillMarkdownVariables = (replacements, templatePath) => {
  const templateContent = fs_1.default.readFileSync(templatePath, "utf-8");
  let filledContent = templateContent;
  if (!templateContent) {
    throw new Error(`Template is empty or not found`);
  }
  for (const [key, value] of Object.entries(replacements)) {
    filledContent = filledContent.replace(new RegExp(`{{${key}}}`, "g"), value);
  }
  return filledContent;
};
exports.fillMarkdownVariables = fillMarkdownVariables;
/** Function to create a Markdown file 📝 */
const createMarkdownFile = (replacements, templatePath) => {
  const content = (0, exports.fillMarkdownVariables)(
    replacements,
    templatePath
  );
  const { username, dateString } = replacements;
  const filePath = path_1.default.join(
    process.cwd(),
    "docs",
    username,
    "DIL",
    `${dateString}.md`
  );
  const dirname = path_1.default.dirname(filePath);
  !fs_1.default.existsSync(dirname) &&
    fs_1.default.mkdirSync(dirname, { recursive: true });

  const presentationFilePath = path_1.default.join(
    process.cwd(),
    "docs",
    username,
    "presentation",
    `chapter_n.md`
  );
  const presentationdirname = path_1.default.dirname(presentationFilePath);
  !fs_1.default.existsSync(presentationdirname) &&
    fs_1.default.mkdirSync(presentationdirname, { recursive: true });

  if (!fs_1.default.existsSync(filePath)) {
    fs_1.default.writeFileSync(filePath, content);
    console.log(`✅ Created ${dateString}.md`);
  } else {
    console.error(`🚫 "${filePath}" already exists 😅`);
  }
};
exports.createMarkdownFile = createMarkdownFile;
