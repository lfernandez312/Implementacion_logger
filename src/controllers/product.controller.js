const { Router } = require('express')
const productController = require('./template.controller'); // Asegúrate de tener tu controlador de productos
const Products = require('../models/products.model');
const { customizeError } = require('../services/error.services');

const router = Router()

router.get('/api', async (req, res) => {
  try {
    // Verificar si el usuario está autorizado como administrador
    if (req.user.role !== 'admin') {
      const errorMessage = customizeError('UNAUTHORIZED_ACCESS');
      return res.status(401).json({ error: errorMessage });
    }

    // Si el usuario está autorizado como administrador, continuar con la lógica para obtener productos
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort === 'desc' ? -1 : 1;
    const query = req.query.query || {};

    // Realizar la búsqueda en base a la consulta
    const products = await Products.paginate(query, {
      limit,
      page,
      sort: { price: sort },
    });

    const totalPages = Math.ceil(products.total / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevLink = hasPrevPage ? `/?page=${page - 1}&limit=${limit}&sort=${sort}` : null;
    const nextLink = hasNextPage ? `/?page=${page + 1}&limit=${limit}&sort=${sort}` : null;

    const options = {
      status: 'success',
      payload: products.docs,
      totalProducts: products.totalDocs,
      limit,
      page,
      sort: { price: sort },
      totalPages,
      prevPage: hasPrevPage ? page - 1 : null,
      nextPage: hasNextPage ? page + 1 : null,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    };

    return res.json(options);
  } catch (error) {
    const errorMessage = customizeError('PRODUCTS_NOT_FOUND');
    return res.status(500).json({ error: errorMessage });
  }
});


router.get('/api/:category/:availability?/:limit?', async (req, res) => {
  try {
    const category = req.params.category;
    const availability = req.params.availability;
    const limit = req.params.limit || 10;
    const sort = req.query.sort;

    const result = await productController.getProductsByCategoryAndAvailability(category, availability, limit, sort);
    res.json(result);
  } catch (error) {
    const errorMessage = customizeError('PRODUCTS_NOT_FOUND');
    return res.status(500).json({ error: errorMessage });
  }
});

router.get('/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const options = {
      page,
      limit,
    };
    const categories = await productController.getCategories();
    const categoryCounts = await productController.getCategoriesAndCount();
    const products = await productController.getAllProducts(options);

    res.render('products.handlebars', { products, categories, categoryCounts, estilo: 'estilos.css' });
  } catch (error) {
    const errorMessage = customizeError('PRODUCTS_NOT_FOUND');
    res.status(500).json({ error: errorMessage });
  }
});

router.get('/:category', async (req, res) => {
  try {
    const category = req.params.category;

    // Verificar si la categoría existe en la base de datos antes de realizar la búsqueda
    const categoryExists = await productController.categoryExists(category);
    if (!categoryExists) {
      const errorMessage = customizeError('CATEGORY_NOT_FOUND');
      return res.status(404).json({ error: errorMessage });
    }

    // Si la categoría existe, obtener los productos de esa categoría
    const products = await productController.getProductsByCategory(category);
    const categoryCounts = await productController.getCategoriesAndCount();
    res.render('categoria.handlebars', { products, category, categoryCounts, estilo: 'estilos.css' });
  } catch (error) {
    const errorMessage = customizeError('INTERNAL_SERVER_ERROR');
    return res.status(500).json({ error: errorMessage });
  }
});


router.post('/agregar', async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const { name, category, description, price, imageUrl } = req.body;

      const newProductInfo = {
        name,
        category,
        description,
        price,
        imageUrl,
      };

      // Crear el producto en MongoDB
      const newProduct = await Products.create(newProductInfo);

      // Crear índices si no existen
      const indexDefinitions = [
        { name: 1, category: 1 },
      ];

      for (const indexDefinition of indexDefinitions) {
        const indexExists = await Products.collection.indexExists(indexDefinition);
        if (!indexExists) {
          await Products.collection.createIndex(indexDefinition);
        }
      }

      res.json({ payload: newProduct });
    } else {
      const errorMessage = customizeError('UNAUTHORIZED_ACCESS');
      return res.status(401).json({ error: errorMessage });
    }
  } catch (error) {
    const errorMessage = customizeError('INTERNAL_SERVER_ERROR');
    return res.status(500).json({ error: errorMessage });
  }
});

module.exports = router
