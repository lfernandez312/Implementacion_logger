const templatesController = require ('../controllers/product.controller');
const authController = require('../controllers/auth.controller')
const viewsTemplateController = require('../controllers/viewsTemplateController')
const usersController = require('../controllers/users.controller')
const productController = require('../controllers/product.controller');
const mockController = require('../controllers/mock.controller');


const router = app => {
    app.use('/tienda', templatesController)
    app.use('/',viewsTemplateController)
    app.use('/auth', authController)
    app.use('/users', usersController)
    app.use('/products', productController)
    app.use('/mockingproducts', mockController)
}

module.exports = router;