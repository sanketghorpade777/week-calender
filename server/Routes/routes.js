const express = require('express');
require('dotenv').config();
const router = express.Router();


const controller = require('../Controllers/MyController');

router.get('/summery',controller.allAppointments);
router.post('/Add-appointment',controller.addAppointment);
router.post('/Delete-appointment',controller.deleteAppointment);
router.post('/Update-appointment',controller.updateAppointment);




module.exports = router;