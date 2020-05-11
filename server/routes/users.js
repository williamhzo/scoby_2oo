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

// firstName: String,
//   lastName: String,
//   profileImg: {
//     type: String,
//     default:
//       "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
//   },
//   email: String,
//   password: String,
//   city: String,
//   contact: {
//     type: Schema.Types.ObjectId,
//     ref: "Contact",
//   },