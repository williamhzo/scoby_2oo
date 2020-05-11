const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

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

router.post("/api/items", (req, res, next) => {
  const { name, description, category, quantity, location, id_user, timestamp } = req.body
  const newItem = { name, description, category, quantity, location, id_user, timestamp }
  console.log('yoo')
  Item.create(newItem)
    .then((itemDocuments) => {
      res.status(201).json(itemDocuments); 
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.patch('/api/items/:id' , (req, res, next) => {
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
