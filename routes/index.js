
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render('index', { contacts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.get('/add', (req, res) => {
  res.render('add');
});


router.post('/add', async (req, res) => {
  try {
    const { name, phone } = req.body;
    const contact = new Contact({ name, phone });
    await contact.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.get('/edit/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.render('edit', { contact });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    const { name, phone } = req.body;
    await Contact.findByIdAndUpdate(req.params.id, { name, phone });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete a contact
router.get('/delete/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
