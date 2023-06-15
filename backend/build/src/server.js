"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const prisma = new client_1.PrismaClient();
const app = express_1.default();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get("/hello", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const test = yield prisma.user.findMany();
    console.log(test);
    res.send("Hello, world!");
}));
app.get("/stop", (req, res) => {
    res.send("Stopping server...");
    server.close(() => {
        console.log("Server stopped");
        process.exit(0);
    });
});
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
