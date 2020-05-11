const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.patch('/me' , (req, res, next) => {
  const { firstName, lastName, city } = req.body;
  let updatedProfile = {firstName, lastName, city}
  User.findByIdAndUpdate(req.session.currentUser._id, updatedProfile, {new:true}).populate('contact').then((userDocuments) => {
    res.status(200).json(userDocuments); 
    // req.session.currentUser = userDocuments
  }).catch(err=>res.status(500).json(err))
})

module.exports = router;