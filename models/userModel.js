const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    occupation: { type: String, required: true },
    likedSongs: [
      {
        songName: String,
        by: String,
        albumName: String,
      },
    ],
    purchasedSongs: {
      waveFile: [
        {
          songName: String,
          by: String,
          albumName: String,
        },
      ],
      stem: [
        {
          songName: String,
          by: String,
          albumName: String,
        },
      ],
      mp3: [
        {
          songName: String,
          by: String,
          albumName: String,
        },
      ],
    },
  },
  { timestamps: true }
);

// User.pre('save',async function(next) {

// })
module.exports = mongoose.model("User", User);
