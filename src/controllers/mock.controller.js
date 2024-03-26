const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Genero 100 productos de ejemplo
    const products = [];
    for (let i = 0; i < 100; i++) {
        products.push({
            name: `Product ${i + 1}`,
            price: Math.random() * 100, // Precio aleatorio entre 0 y 100
            category: 'Ejemplo Coder',
        });
    }
    res.json(products);
});

module.exports = router;