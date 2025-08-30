const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "uploads/" });

let savedPDFs = []; // TODO: Replace with real DB (MongoDB, etc.)

router.post("/pdf/save", upload.single("pdf"), (req, res) => {
  const { videoId, pdfName, summary } = req.body;
  const pdfPath = req.file.path;

  savedPDFs.push({
    id: Date.now(),
    videoId,
    pdfName,
    summary,
    filePath: pdfPath,
    createdAt: new Date(),
  });

  res.json({ message: "PDF saved successfully." });
});

router.get("/pdf/all", (req, res) => {
  res.json(savedPDFs);
});

module.exports = router;
