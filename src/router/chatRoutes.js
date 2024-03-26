const express = require('express');
const chatController = require('../controllers/chat.controller');
const { customizeError } = require('../services/error.services');

const router = express.Router();

//FileSystem
router.get('/contacto', (req, res) => {
    res.render('chat.handlebars');
  });

router.get('/contacto/cargarChat', async (req, res) => {
    try {
        const messages = await chatController.getChatMessages();
        res.json({ status: 'success', messages });
    } catch (error) {
        const errorMessage = customizeError('ERROR_LOAD_CHAT');
        res.status(500).json({ error: errorMessage });
    }
});

router.post('/in', async (req, res) => {
    try {
        const { user, message } = req.body;
        const newUserInfo = { user, message };
        const newUser = await chatController.createChatMessage(newUserInfo);
        res.json({ payload: newUser });
    } catch (error) {
        const errorMessage = customizeError('INTERNAL_SERVER_ERROR');
        res.status(500).json({ error: errorMessage });
    }
});

module.exports = router;
