const express = require("express");
const {
  createBeat,
  getBeat,
  getBeatByID,
  deleteBeat,
  updateBeat,
  getUniqueBeatAlbums,
  getUniqueMood,
  getAlbumBeats,
  getMoodBeats,
  getUniqueGenre,
  getGenreBeats,
} = require("../controllers/beatController");
const router = express.Router();

router.post("/createBeat", createBeat);
router.post("/getBeat", getBeat);
router.get("/getBeat/:id", getBeatByID);
router.delete("/deleteBeat/:id", deleteBeat);
router.patch("/updateBeat/:id", updateBeat);
router.post("/getUniqueBeatAlbums", getUniqueBeatAlbums);
router.post("/getUniqueMood", getUniqueMood);
router.post("/getAlbumBeats", getAlbumBeats);
router.post("/getMoodBeats", getMoodBeats);
router.post("/getUniqueGenre", getUniqueGenre);
router.post("/getGenreBeats", getGenreBeats);
module.exports = router;
