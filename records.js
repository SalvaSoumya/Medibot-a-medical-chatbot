const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Records route is working'));
router.post('/add', (req, res) => res.send('Add record endpoint working'));

module.exports = router;
