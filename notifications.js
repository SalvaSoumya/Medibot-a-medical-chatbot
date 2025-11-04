const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Notifications route is working'));
router.post('/send', (req, res) => res.send('Send notification endpoint working'));

module.exports = router;
