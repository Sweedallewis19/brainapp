"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load variables from .env file
exports.JWT_SECRET = process.env.JWT_SECRET;
if (!exports.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
}
