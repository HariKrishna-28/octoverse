const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const shuffleArray = require("../components/helpers/Shuffler");

// Update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

// Get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const userName = req.query.userName;
  const email = req.query.userEmail;
  try {
    const user = userId
      ? await User.findById(userId)
      : email
      ? await User.findOne({ email: email })
      : await User.findOne({ userName: userName });
    // const { updatedAt, ...other } = user._doc;
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// Get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendsList = [];
    friends.map((friend) => {
      const { _id, userName, profilePicture, email } = friend;
      friendsList.push({ _id, userName, profilePicture, email });
    });
    res.status(200).json(friendsList);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await currentUser.updateOne({
          $push: { following: req.params.id },
        });
        await user.updateOne({
          $push: { followers: req.body.userId },
        });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cant follow yourself");
  }
});

// Unollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await currentUser.updateOne({
          $pull: { following: req.params.id },
        });
        await user.updateOne({
          $pull: { followers: req.body.userId },
        });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You dont follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cant unfollow yourself");
  }
});

async function getUser(followerId, userId) {
  try {
    if (followerId !== userId) {
      const data = await User.findById(followerId);
      const userInfo = {
        _id: data._id,
        userName: data.userName,
        email: data.email,
        profilePicture: data.profilePicture,
      };
      return userInfo;
    }
    return;
  } catch (error) {
    console.log(error);
  }
}

// Get friends suggestions
router.get("/suggestions/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userFollowers = shuffleArray(user.following);
    const suggestions = await Promise.all(
      userFollowers.map((follower) => {
        const data = getUser(follower, req.params.id);
        if (data) return data;
        if (suggestions.length > 10) {
          res.status(200).json(suggestions);
        }
      })
    );
    res.status(200).json(suggestions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
