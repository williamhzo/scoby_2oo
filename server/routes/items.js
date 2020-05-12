const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const upload = require("../config/cloudinaryConfig");

router.get("/api/items", (req, res, next) => {
  Item.find()
    .then((itemDocuments) => {
      res.status(200).json(itemDocuments); 
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/api/items/:id", (req, res, next) => {
  Item.findById(req.params.id)
    .then((itemDocuments) => {
      res.status(200).json(itemDocuments); 
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/api/items", upload.single("image"), (req, res, next) => {
  const { name, description, category, quantity, id_user, timestamp, address } = req.body
  // const {type,coordinates, formattedAddress} = req.body.location
  console.log(req.body)
  console.log(req.body.location)
  // const locationType = req.body.location.type
  // const locationCoordinates = req.body.location.coordinates
  // const locationFormattedAddress = req.body.location.formattedAddress
  const newItem = { name, description, category, quantity, id_user, timestamp, address, location: {type: req.body.locationType, coordinates: req.body.coordinates, formattedAddress: req.body.formattedAddress} }
  // newItem.location = {locationType, locationCoordinates, locationFormattedAddress}
  
  if (req.file) {
    newItem.image = req.file.secure_url;
  }
  Item.create(newItem)
    .then((itemDocuments) => {
      res.status(201).json(itemDocuments); 
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.patch('/api/items/:id' , upload.single("image"), (req, res, next) => {
  if (req.file) {
    Item.image = req.file.secure_url;
    // req.body = {
    //   ...req.body,
    //   image
    // }
  }
  Item.findByIdAndUpdate(req.params.id, req.body, {new:true}).then((itemDocuments) => {
    res.status(200).json(itemDocuments); 
  }).catch(err=>res.status(500).json(err))
})

router.delete('/api/items/:id', (req, res, next)=>{
  Item.findByIdAndRemove(req.params.id)
  .then((itemDocument) => {
    if (itemDocument === null) {
      res.status(404).json({ message: "Item not found" });
    } else {
      res.status(204).json(itemDocument);
    }
  })
  .catch((error) => {
    res.status(500).json(error);
  });
})

module.exports = router;
