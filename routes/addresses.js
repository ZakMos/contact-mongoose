const express = require('express');
const Boom = require('boom');
const AddressesService = require('../services/contact-service');

const router = express.Router();

router.post('/', async (req, res, next)=> {
  try{
    const address = await AddressesService.create(req.body);
    res.json(address);
  }catch(err){
    if(err.name === 'ValidationEroor'){
      next(Boom.badRequest(err));
    }
    next(Boom.badImplementation(err));
  }
});

// List all addresses
router.get('/', async (req, res)=> {
  const contacts = await AddressesService.retrive();
  res.json(contacts)
});

// Get a single address by id
router.get('/:id', async (req, res, next)=> {
  const {id} = req.params;
try{
  const address = await AddressesService.retrive(id);
  res.json(address);
}catch(err){
  next(Boom.notFound(`No such address with id ${id}`));
  }
});

//update an address
router.put('/:id', async (req, res, next)=> {
  const {id} = req.params;
  try{
    const updated = await AddressesService.update(id, rq.body);
    res.json(updated);
  }catch(err){
    if(err.name === 'ValidationEroor'){
      next(Boom.badRequest(err));
    } else{
      next(Boom.notFound(`No such address with id: ${id}`));
    }
  }
});


// Delete an addresses
router.delete('/:id', async (req, res, next)=> {
  const {id} = req.params;
  try{
    const deleted = await AddressesService.delete(id);
  }catch(err){
    next(Boom.notFound(`No such address with id: ${id}`))
  }
});

module.exports = router;
