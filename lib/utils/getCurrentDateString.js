"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDateString = void 0;
/** Function to get the current date 📅 */
const getCurrentDateString = () => {
  return new Date().toISOString().slice(0, 10);
};
exports.getCurrentDateString = getCurrentDateString;
