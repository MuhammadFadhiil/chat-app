var express = require('express');
var router = express.Router();
var Chat = require('../models/Chat');

/* GET ALL CHATS BY ROOM ID */
router.get('/:roomid', async (req, res) => {
  const roomId = req.params.roomid;

  try {
    const chats = await Chat.find({ room: roomId });
    res.status(200).send({ chats });
  } catch (e) {
    res.status(400).send(e);
  }
});

/* SAVE CHAT */
router.post('/', async(req, res) => {
  const chat = new Chat(req.body);

  try {
    await chat.save();
    res.status(201).send({ chat });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;