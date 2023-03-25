const mongoose = require("mongoose");

const Beat = mongoose.Schema(
  {
    beatName: { type: String, required: true, unique: true },
    by: { type: String, required: true },
    beatAlbum: { type: String },
    mood: { type: String, required: true },
    genre: { type: String, required: true },
    tags: [{ type: String }],
    bpm: { type: Number, required: true },
    key: { type: String, required: true },
    likes: { type: Number },
    price: {
      wave: { type: Number, required: true },
      stem: { type: Number, required: true },
      mp3: { type: Number, required: true },
    },

    downloads: { type: Number },
    beatArt: { type: String, required: true, unique: true },
    beatUri: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Beat", Beat);
