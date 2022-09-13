const router = require("express").Router();
const req = require("express/lib/request");
const { User, BlogPost } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await BlogPost.findAll({
      include: [User],
      where: { user_id: req.session.user_id },
    });

    const posts = userData.map((post) => post.get({ plain: true }));
    // console.log(posts);
    res.render("dashboard", {
      posts,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/:id", withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });

    const posts = postData.get({ plain: true });

    res.render("posts-admin", {
      ...posts,
      user_id: req.session.user_id,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });

    const posts = postData.get({ plain: true });

    res.render("edit", {
      ...posts,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
