const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    //   GENERATE NEW ENCRYPTED PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // CREATE NEW USER
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      description: req.body.description,
      city: req.body.city,
      from: req.body.from,
    });

    // SAVE USER
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const userCheck = await User.findOne({ email: req.body.email });
    if (!userCheck) {
      // console.log(req.body);
      const newUser = new User(req.body);
      const user = await newUser.save();
      res.status(200).json(user);
    } else res.status(200).json(userCheck);
    // else {
    //   const validPassword = await bcrypt.compare(
    //     req.body.password,
    //     user.password
    //   );

    //   if (!validPassword) res.status(400).json({ message: "Wrong password" });
    //   else res.status(200).json(user);
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }
});

module.exports = router;
