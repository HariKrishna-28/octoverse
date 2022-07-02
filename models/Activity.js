const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      max: 500,
    },
    followerId: {
      type: String,
      required: true,
    },
    followerEmail: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    hasSeen: {
      type: Boolean,
      required: true,
      default: false,
    },
    post: {
      img: {
        type: String,
      },
      id: {
        type: String,
      },
      desc: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
ActivitySchema.index({ createdAt: 1 }, { expireAfterSeconds: 432000 });

module.exports = mongoose.model("Activity", ActivitySchema);

// 2592000;
