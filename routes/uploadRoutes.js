const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const fs = require("fs");
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if(req.file === undefined){
      return res.send("You must select a file")
    }
    res.send({
      message: "File uploaded successfully",
      file: req.file,
    });
  } catch (error) {
    res.status(400).send({ message: "Error in uploading file" });
  }
});

module.exports = router;