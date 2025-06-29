const express = require('express');
const router = express.Router();
const { 
    getTotalClicks, 
    incrementClicks, 
    resetClicks, 
    getStats 
} = require('../controller/click.controller');

// Obtener el total de clicks
router.get('/total', getTotalClicks);

// Incrementar clicks
router.post('/increment', incrementClicks);

// Resetear clicks
router.post('/reset', resetClicks);

// Obtener estadísticas
router.get('/stats', getStats);

module.exports = router; 