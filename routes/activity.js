const activity = require("../models/Activity");

const router = require("express").Router();

router.post("/new", async (req, res) => {
  try {
    const data = new activity(req.body);
    const userActivity = await data.save();
    res.status(200).json(userActivity);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const act = await activity
      .find({ userEmail: req.query.id })
      .sort({ createdAt: -1 });
    res.status(200).send(act);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/notifications", async (req, res) => {
  try {
    const count = await activity
      .findOne({ userEmail: req.query.id })
      .count({ hasSeen: "false" });
    res.status(200).send({ count: count });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const avt = await activity.findById(req.params.id);
    if (avt.userEmail !== req.body.userEmail) {
      res.status(403).json("You can update only yours");
    } else {
      await avt.updateOne({
        $set: {
          hasSeen: true,
        },
      });
      res.status(200).json("Updated");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
