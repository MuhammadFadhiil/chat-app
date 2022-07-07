var express = require('express');
var router = express.Router();
var Room = require('../models/Room');

/* GET ALL ROOMS */
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).send({ rooms });
    } catch (e) {
        res.status(400).send(e);
    }
  });
  
/* GET SINGLE ROOM BY ID */
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const room = await Room.findById(id);
        res.status(200).send({ room });
    } catch (e) {
        res.status(400).send(e);
    }
});

/* SAVE ROOM */
router.post('/', async (req, res) => {
    const room = new Room(req.body);
    
    try {
        await room.save();
        res.status(201).send({ room });
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;