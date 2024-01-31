const fs = require("fs");

const uploadPicture = (req, res) => {
  const { filename } = req.file;
  const { id } = req.params;

  fs.rename(
    `./public/uploads/pictures/${filename}`,
    `./public/uploads/pictures/${id}.png`,
    (err) => {
      if (err) throw err;
      res.send("File uploaded");
    }
  );
};

module.exports = {
  uploadPicture,
};
