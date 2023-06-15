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

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
