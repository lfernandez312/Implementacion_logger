const Product = require('../models/products.model');

exports.getAllProducts = async (options) => {
    const products = await Product.paginate({}, options);
    //const products = await Product.paginate({}, options).populate('status');
    return products.docs;
};

exports.getCategories = async () => {
    try {
        const categories = await Product.distinct('category');
        return categories;
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        throw error;
    }
};

exports.getCategoriesAndCount = async (req, res) => {
    try {
        const categoryCounts = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);
        return categoryCounts;
    } catch (error) {
        console.error('Error al obtener categorías y cantidad de productos por categoría:', error);
        res.status(500).json({ error: 'Error del servidor al obtener categorías y cantidad de productos por categoría' });
    }
};

exports.categoryExists = async (category) => {
  try {
    // Realizar una consulta a la base de datos para verificar si la categoría existe
    const categoryCount = await Product.countDocuments({ category: category });
    return categoryCount > 0; // Devuelve true si la categoría existe, false en caso contrario
  } catch (error) {
    console.error('Error al verificar la existencia de la categoría:', error);
    throw error;
  }
};

exports.getProductsByCategory = async (category) => {
  try {
    const products = await Product.find({ category: category });
    return products;
  } catch (error) {
    console.error(`Error al obtener productos por categoría (${category}):`, error);
    throw error;
  }
};

exports.getProductsByCategoryAndAvailability = async (category, availability, limit, sort, page) => {
    try {
      const query = {
        category,
      };
  
      if (availability !== undefined) {
        // Verificar si la disponibilidad es 'true' o 'false'
        const availabilityStatus = availability.toLowerCase() === 'true';
        query.status = availabilityStatus;
      }
  
      const options = {
        page: page || 1,
        limit: limit || 10,
        sort: sort ? { price: sort === 'desc' ? -1 : 1 } : null, // Nuevo: aplicar el ordenamiento si se proporciona
      };
  
      const result = await Product.paginate(query, options);
  
      return {
        status: 'success',
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.prevLink,
        nextLink: result.nextLink,
      };
    } catch (error) {
      console.error('Error al obtener productos por categoría y disponibilidad:', error);
      throw error;
    }
  };