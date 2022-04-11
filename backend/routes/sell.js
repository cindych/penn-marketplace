const express = require('express');
const multer = require('multer'); // for uploading images

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './userUploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:|\./g, '') + file.originalname); // renames file to be stored
  },
});

const upload = multer({ storage });

const ItemRegular = require('../models/ItemRegular');
const ItemBid = require('../models/ItemBid');

const router = express.Router();

// route to list a regular listing
router.post('/addRegListing', async (req, res, next) => {
  const {
    product, productDescr, price, tag,
  } = req.body;
  try {
    await ItemRegular.create({
      posterName: req.session.name,
      itemName: product,
      itemDescr: productDescr,
      price,
      tag,
    });
    res.status(201).send('Regular listing was successfully posted!');
  } catch (error) {
    next(new Error(error));
  }
});

// route to list a regular listing with picture
// upload.single is a middleware to process imageFile, access the file details using req.file
router.post('/addRegListingPic', upload.single('imageFile'), async (req, res, next) => {
  const {
    product, productDescr, price, tag,
  } = req.body;
  try {
    await ItemRegular.create({
      posterName: req.session.name,
      itemName: product,
      itemDescr: productDescr,
      media: req.file.path,
      price,
      tag,
    });
    res.status(201).send('Regular listing was successfully posted!');
  } catch (error) {
    next(new Error(error));
  }
});

// route to list a bid listing
router.post('/addBidListing', async (req, res, next) => {
  const {
    product, productDescr, tag,
  } = req.body;
  try {
    await ItemBid.create({
      posterName: req.session.name,
      itemName: product,
      itemDescr: productDescr,
      price: 0,
      tag,
    });
    res.status(201).send('Bid listing was successfully posted!');
  } catch (error) {
    next(new Error('Error with creating a bid listing'));
  }
});

// route to list a bid listing with picture
router.post('/addBidListingPic', upload.single('imageFile'), async (req, res, next) => {
  const {
    product, productDescr, tag,
  } = req.body;
  try {
    await ItemBid.create({
      posterName: req.session.name,
      itemName: product,
      itemDescr: productDescr,
      media: req.file.path,
      price: 0,
      tag,
    });
    res.status(201).send('Bid listing was successfully posted!');
  } catch (error) {
    next(new Error('Error with creating a bid listing'));
  }
});

module.exports = router;
