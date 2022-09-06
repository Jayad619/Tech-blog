const router = require('express').Router();
const { User } = require('../../models');


router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const userData = await User.create({
      username: req.body.name,
      email: req.body.email,
      password:req.body.password,
    });