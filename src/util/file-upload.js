const multer = require("multer");
const fs = require("fs");
const sharp = require("sharp");
const remBg = require("rembg-node");
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images !", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadFiles = upload.array("media", 6);

const uploadImages = (req, res, next) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code == "LIMIT_UNEXPECTED_FILE") {
        return res.json("Ko'p img jo'natildi");
      } else if (err) {
        return res.json(err);
      }
    }
    next();
  });
};

const resizeImages = async (req, res, next) => {
  if (!fs.existsSync(`./uploads`)) {
    fs.mkdirSync(`./uploads`, {
      recursive: true,
    });
  }

  if (!req?.files) return next();
  req.body.media = [];

  await Promise.all(
    req.files.map(async (file, index) => {
      const value = Date.now() + index;

      const newFilename = `${value}.png`;

      await sharp(file.buffer)
        .resize(150)
        .toFormat("png")
        .png({ quality: 90 })
        .toFile(`./uploads/${newFilename}`);

      req.body.media.push({
        image: `${req.protocol}://${req.get("host")}/files/${newFilename}`,
      });
    })
  );
  next();
};

module.exports = {
  uploadImages,
  resizeImages,
};
