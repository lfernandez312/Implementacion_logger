const { environment } = require("../../config/app.config");
const trimmedEnvironment = environment.trim();

switch (trimmedEnvironment) {
    case 'prod':
        console.log('Se utiliza Prod Logger');
        module.exports = require('./prodLogger')
        break;

    case 'dev':
        console.log('Se utiliza Prod Logger');
        module.exports = require('./devLogger')
        break;

    default:
        console.log('No hay logger');
        break;
}