const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
      const posts = await BlogPost.findAll({
        include: [User],
      });
  
      const postData = posts.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        postData,
        user_id: req.session.user_id,
      });
    } catch (err) {
      console.log(err);
    }
  });