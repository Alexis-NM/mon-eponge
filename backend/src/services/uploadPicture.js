const multer = require("multer");
const path = require("path");

// Configuration de Multer pour l'upload de captures
const pictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/public/assets/tip_icons");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    // Obtenez uniquement le nom du fichier sans le chemin complet
    const fileName = `picture-${uniqueSuffix}${path.extname(
      file.originalname
    )}`;
    req.uploadedFileName = fileName; // Stocke le nom du fichier dans la requête
    cb(null, fileName);
  },
});

// Filtrer uniquement les fichiers SVG
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/svg+xml") {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers SVG sont autorisés!"), false);
  }
};

const uploadPicture = multer({
  storage: pictureStorage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limite la taille du fichier à 5 Mo
  },
  fileFilter,
}).single("picture_url");

module.exports = uploadPicture;
