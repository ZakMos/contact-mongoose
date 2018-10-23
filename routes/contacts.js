const express = require('express');
const Boom = require('boom');

const contactService = require('../services/contact-services');
const router = express.Router();


router.post('/', async (req, res, next) => {
  try{
    const contact = await contactService.creat(req.body);
    res.json(contact);
  }catch(err){
    if(err.name === 'ValidationError'){
      next(Boom.badRequest(err));
    }
      next(Boom.badImplemation(err));
  }
});

router.get('/', async(req, res) => {
  const contact = await contactService.retrive();
  res.json(contact);
});

router.get('/:id'), async(req, res, next) => {
  const {id} = req.params;
  try{
    const contact = await contactService.retrive(id);
    res.json(contact);
  } catch(err){
    next(Boom.notFound(`No such contact with id: ${id}`));
  }
});



router.put('/:id', async(req, res, next)=> {
  const {id} = req.params;
  try{
    const updated = await contactService.update(id);
    res.json(updated);
  } catch(err){
    if(err.name === 'ValidatationError'){
      next(Boom.badRequest(err));
    } else{
      next(Boom.notFound(`No such contact with id: ${id}`));
    }
  }
});

router.delete('/:id', async(req, res, next)=> {
  const {id} = req.params;
  try{
    const deleted = await contactService.delete(id);
    res.json(deleted);
  }catch(err){
    next(Boom.notFound(`No such contact with id ${id}`));
  }
});

module.exports = router;
