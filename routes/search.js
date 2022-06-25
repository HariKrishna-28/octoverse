const User = require("../models/User");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const query = req.query.q;
    const result = await User.aggregate([
      {
        $search: {
          autocomplete: {
            query: query,
            path: "userName",
            fuzzy: {
              maxEdits: 1,
            },
          },
        },
      },
    ]);
    const refinedUserData = result.map((user) => {
      return {
        _id: user._id,
        userName: user.userName,
        profilePicture: user.profilePicture,
        email: user.email,
      };
    });
    res.status(200).json(refinedUserData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
