import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();

const app: express.Application = express();

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/hello", async (req: Request, res: Response) => {
  const test = await prisma.user.findMany();
  console.log(test);
  res.send("Hello, world!");
});

app.get("/stop", (req: Request, res: Response) => {
  res.send("Stopping server...");
  server.close(() => {
    console.log("Server stopped");
    process.exit(0);
  });
});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
