const router = require("express").Router();
const { User } = require("../../models");

/* Post request to create a user route*/
router.post("/", async (req, res) => {
  try {
    console.log(req.body, "from sign-up route");
    const userData = await User.create({
      username: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

/* Post request to create login route */
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

/* Post request to create logout route */
router.post("/logout", (req, res) => {
  if (req.session.user_id) {
    req.session.destroy(() => {
      res.status(204).end();
      console.log("logged out");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
