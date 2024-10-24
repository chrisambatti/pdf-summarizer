const Router = require("express").Router;
const router = new Router();
const multer = require("multer");
const path = require("path");
const translate = require("@vitalets/google-translate-api");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const { summarizer } = require("./controller");

console.log("Router file loading");

// Set up Multer storage engine to store in memory
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

//Setup Multer to store fily locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//handle upload
router.post("/upload", upload.single("file"), (req, res) => {
  console.log("/upload");
  // console.log("here",req.file);
  // console.log("Request object: ",req);
  // console.log("Request file ", req.file);

  summarizer(req.file)
    .then((data) => {
      console.log("Summary object: ", data);
      res.send(data);
    })
    .catch((err) => {
      console.error("Error summarizing file:", err);
      res.status(500).send("Error summarizing file");
    });

  // res.send(fileUpload(req.file));
});

// -------------------------------------------------

async function pdfToText(filePath) {
  const dataBuffer = fs.readFileSync(filePath); // Use readFileSync for testing
  try {
    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text; // Return the extracted text
  } catch (error) {
    console.error("Error extracting text from PDF", error);
    throw error; // Rethrow the error to handle it in the route
  }
}

async function translator(pdfText, targetLanguage) {
  const myHeaders = new Headers();
  myHeaders.append(
    "x-rapidapi-key",
    "20f0a9e35fmshf3edfd4c2b8b193p145be7jsnc3c90ae4c18b"
  );
  myHeaders.append("x-rapidapi-host", "google-translator9.p.rapidapi.com");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    q: pdfText,
    source: "en",
    target: targetLanguage,
    format: "text",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let Response = await fetch("https://google-translator9.p.rapidapi.com/v2",requestOptions);
    let data = await Response.json();
    if (data["data"]) {
      // console.log("IF:",data['data']['translations'][0]['translatedText']);
      return data["data"]["translations"][0]["translatedText"];
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
}

router.post("/translate", upload.single("file"), async (req, res) => {
  console.log("/translate");

  const filePath = req.file.path; // Path to the uploaded file

  try {
    const pdfText = await pdfToText(filePath); // Extract text from the PDF
    console.log("PDF text Extracted");

    const targetLanguage = req.body.language; // Get the target language from the request

    // Perform translation
    let translatedText = await translator(pdfText, targetLanguage);
    console.log("Text translated", translatedText.substr(0,10));
    res.send(translatedText);
  } catch (error) {
    res.status(500).send("Error extracting text from PDF");
  }
});

// Serve the translate page
router.get("/translate", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/translate.html"));
});

module.exports = router;
