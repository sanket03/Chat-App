const express = require('express'),
      chat = require('../utilities/socket');

const router = express.Router();

router.get('/getActiveUsersList', (req,res) => {
    res.send(chat.userList);
});

module.exports = router;