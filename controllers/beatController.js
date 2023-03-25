const Beat = require("../models/beatModel");

const createBeat = async (req, res) => {
  const {
    beatName,
    by,
    mood,
    genre,
    bpm,
    key,
    beatAlbum,
    price,
    beatArt,
    beatUri,
  } = req.body;
  try {
    const beat = await Beat.create({
      beatName,
      by,
      mood,
      genre,
      bpm,
      key,
      beatAlbum,
      price,
      beatArt,
      beatUri,
    });
    res.status(200).json(beat);
  } catch (e) {
    res.json({ error: e.message });
  }
};

const getBeat = async (req, res) => {
  try {
    const beat = await Beat.find({}).sort({ createdAt: -1 });
    res.status(200).json(beat);
  } catch (error) {
    res.json({ error: error });
  }
};
const getUniqueBeatAlbums = async (req, res) => {
  try {
    const uniqueAlbums = await Beat.aggregate([
      {
        $group: {
          _id: "$beatAlbum",
          beatArt: { $first: "$beatArt" },
          by: { $first: "$by" },
        },
      },
    ]);
    return res.status(200).json(uniqueAlbums);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error getting unique beat albums" });
  }
};
const getAlbumBeats = async (req, res) => {
  const { albumName } = req.body;

  try {
    const beats = await Beat.find({ beatAlbum: albumName });
    console.log(`Found ${beats.length} beats with album name ${albumName}`);
    return res.json(beats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting album beats" });
  }
};
const getMoodBeats = async (req, res) => {
  const { mood } = req.body;

  try {
    const beats = await Beat.find({ mood: mood });
    console.log(`Found ${beats.length} beats with mood name ${mood}`);
    return res.json(beats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting mood beats" });
  }
};
const getGenreBeats = async (req, res) => {
  const { genre } = req.body;

  try {
    const beats = await Beat.find({ genre: genre });
    console.log(`Found ${beats.length} beats with genre name ${genre}`);
    return res.json(beats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting genre beats" });
  }
};

const getUniqueMood = async (req, res) => {
  try {
    const uniqueMood = await Beat.aggregate([
      {
        $group: {
          _id: "$mood",
          beatArt: { $first: "$beatArt" },
          by: { $first: "$by" },
        },
      },
    ]);
    return res.status(200).json(uniqueMood);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error getting unique beat albums" });
  }
};
const getUniqueGenre = async (req, res) => {
  try {
    const uniqueGenre = await Beat.aggregate([
      {
        $group: {
          _id: "$genre",
          beatArt: { $first: "$beatArt" },
          by: { $first: "$by" },
        },
      },
    ]);
    return res.status(200).json(uniqueGenre);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting unique beat Genre" });
  }
};
const getBeatByID = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json({ error: "no such beat" });
  }
  try {
    const beat = await Beat.findById(id);

    res.status(200).json(beat);
    if (!beat) {
      res.status(404).json({ error: "no such beat" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};
const deleteBeat = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json({ error: "no such beat" });
  }
  try {
    const beat = await Beat.findOneAndDelete({ _id: id });

    res.status(200).json(beat);
    if (!beat) {
      res.status(404).json({ error: "no such beat" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const updateBeat = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json({ error: "no such beat" });
  }
  try {
    const beat = await Beat.findOneAndUpdate({ _id: id }, { ...req.body });

    res.status(200).json(beat);
    if (!beat) {
      res.status(404).json({ error: "no such user" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
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
};
