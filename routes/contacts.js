const express         = require('express');
const Boom            = require('boom');
const ContactService  = require('../services/contact-service');
const router          = express.Router();


router.post('/', async (req, res, next) => {
console.log(req.body);
  try {
    const contact = await ContactService.create(req.body);

    res.json(contact);
  } catch(err){
    if(err.name === 'ValidationEroor'){
      next(Boom.badRequest(err));
    }

      next(Boom.badImplementation(err));
  }

});


router.get('/', async(req, res) => {
  const {contactid} = req.query;

  const contacts = await ContactService.retrieve({contactid});

  res.json(contacts);
});


router.get('/:id', async (req, res, next )=> {
  const {id} = req.params;
  try {
    const contact = await ContactService.retrieve({id});
    res.json(contact);
  } catch(err) {
    next(Boom.notFound(`No such contact with id: ${id}`));
  }
});


router.put('/:id', async (req, res, next) => {
  const {id} = req.params;

  try {
    const updated = await ContactService.update(id, req.body);
    res.json(updated);
  } catch(err){
    if(err.name === 'ValidationEroor'){
      next(Boom.badRequest(err));
    } else {
      next(Boom.notFound(`No such contact with id: ${id}`));
    }
  }
});


router.delete('/:id', async(req, res, next) => {
  const {id} = req.params;
  try {
    const deleted = await ContactService.delete(id);
    res.json(deleted);
  } catch(err) {
    next(Boom.notFound(`No such contact with id ${id}`));
  }

});

module.exports = router;
