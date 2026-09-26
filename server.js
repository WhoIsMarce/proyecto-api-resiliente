const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Configuración del Rate Limiter con enfoque CX
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // Ventana de tiempo: 1 minuto
    max: 5, // Limite: 5 peticiones por IP en esa ventana
    standarHeaders: true,
    legacyHeaders: false,
    // Aquí está la magia de CX: Un mensaje de error empático y claro
    handler: (req, res) => {
        res.status(429).json({
            error: "Too Many Requests",
            message: "Who there, speedy! You've hit the limit of 5 requests per minute. Please take a quick breather and try again in 60 seconds.",
        });
    }
});

// Aplicar el limitador a todas las rutas que comiencen con /api/
app.use('/api/', apiLimiter);

// 2. Endpoint simulado para consumir datos con éxito
app.get('/api/data', (req, res) => {
    res.json({
        success: true,
        message: "Here is your data! The connection is stable.",
        data: { id: 1, topic: "API Resilience & CX"}
    });
});

// 3. Endpoint simulado que falla a propósito (para probar el manejo de errores)
app.get('/api/broken', (req, res, next) => {
    const err = new Error("Database timeout");
    err.status = 500;
    next(err); // Pasamos el error al manejador global
});

// 4. Fallback para rutas que no existen (404) con CX
app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: "Hmm, we couldn't find the endpoint you're looking for. Please double-chechk the URL.",
    });
});

// 5. Manejador Global de Errores (Global Error Handler)
app.use((err, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: "Internal Server Error",
        message: "Oop! Something went wrong on our end. Our engineering team has been notified. Please try again later.",
        technical_detail: err.message // En un entorno real, esto se oculta en producción
    });
});

app.listen(PORT, () => {
    console.log(`Resilent API running on http://localhost:${PORT}`);
    console.log(`Test limits at: http://localhost:${PORT}/api/data`);
});