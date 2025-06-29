const Click = require('../models/click');

// Obtener el total de clicks
const getTotalClicks = async (req, res) => {
    try {
        let clickData = await Click.findOne();
        
        if (!clickData) {
            // Si no existe, crear uno nuevo
            clickData = new Click({ total: 0 });
            await clickData.save();
        }
        
        res.json({
            total: clickData.total,
            lastUpdated: clickData.lastUpdated,
            server: require('os').hostname()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Incrementar el contador de clicks
const incrementClicks = async (req, res) => {
    try {
        let clickData = await Click.findOne();
        
        if (!clickData) {
            clickData = new Click({ total: 1 });
        } else {
            clickData.total += 1;
            clickData.lastUpdated = new Date();
        }
        
        await clickData.save();
        
        res.json({
            total: clickData.total,
            lastUpdated: clickData.lastUpdated,
            server: require('os').hostname(),
            message: 'Click incrementado exitosamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Resetear el contador
const resetClicks = async (req, res) => {
    try {
        let clickData = await Click.findOne();
        
        if (!clickData) {
            clickData = new Click({ total: 0 });
        } else {
            clickData.total = 0;
            clickData.lastUpdated = new Date();
        }
        
        await clickData.save();
        
        res.json({
            total: clickData.total,
            lastUpdated: clickData.lastUpdated,
            server: require('os').hostname(),
            message: 'Contador reseteado exitosamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener estadísticas
const getStats = async (req, res) => {
    try {
        const clickData = await Click.findOne();
        const total = clickData ? clickData.total : 0;
        
        res.json({
            total,
            server: require('os').hostname(),
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTotalClicks,
    incrementClicks,
    resetClicks,
    getStats
}; 