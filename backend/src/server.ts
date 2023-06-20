import { PrismaClient } from "@prisma/client";
import axios from "axios";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import fs from "fs-extra";
import multer from "multer";
import path from "path";
import pdfParse from "pdf-parse";

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

async function fetchResumeInformation(resume: string) {
  const prompt = `from this resume privide information about canditate like
        - english level
        - city of living
        - age
        - studies (2nd year of studies / 4 years after studies etc.)
        - github profile
        - skill written in CV (i.e. Technologies)
        - personal website
        format it as json with keys 'name', 'surname', 'github', 'englishLvl', 'age', 'education', 'skills', 'personalWebsite', 'city'
        don't add comments to json 
        ${resume}`;

  const data = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 2048,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      data,
      { headers: headers }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const upload = multer({ storage: storage });

const app: express.Application = express();

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  try {
    if (file.mimetype !== "application/pdf") {
      res.status(400).json({
        message: "File is not a PDF",
      });
      return;
    }

    const dataBuffer = fs.readFileSync(file.path);

    const data = await pdfParse(dataBuffer);
    console.log(data.text);

    const aiResponse = fetchResumeInformation(data.text).then(
      (response) => response.choices[0].message.content
    );

    const candidateData = JSON.parse(await aiResponse);

    console.log(candidateData);

    if (candidateData) {
      prisma.candidate
        .create({
          data: {
            name: candidateData.name,
            surname: candidateData.surname,
            github: candidateData.github,
            englishLvl: candidateData.englishLvl,
            age: candidateData.age,
            studies: JSON.stringify(candidateData.education),
            skills: JSON.stringify(candidateData.skills),
            website: candidateData.personalWebsite,
            city: candidateData.city,
          },
        })
        .catch((error) => console.log(error));
    }

    fs.remove(file.path);

    res.send("File uploaded");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).send({ error: "Server error", message: error.message });
    }
    res.status(500).send({ error: "Server error" });
  }
});

app.get("/candidates", async (req: Request, res: Response) => {
  try {
    const candidates = await prisma.candidate.findMany();

    res.status(200).send(candidates);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).send({ error: "Server error", message: error.message });
    }
    res.status(500).send({ error: "Server error" });
  }
});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
