const MessageFactory = require("../adapters/factory");
const transport = require('../utils/nodemailer.util');
const { email_out } = require('../config/services.config');
const { customizeError } = require("./error.services");


const messageFactory = new MessageFactory();
const messageManager = messageFactory.getMessageManager();

const users = [];

const create = async newUserInfo => {
  users.push(newUserInfo);

  await messageManager.sendMessage(newUserInfo);

  return users;
};

const purchaseUser = async authUserInfo => {
  try {
    // Redondear el monto total a dos decimales
    const roundedAmount = authUserInfo.amount.toFixed(2);

    const productRows = authUserInfo.products.map(product => `
      <tr>
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>u$s ${product.price}</td>
      </tr>
    `).join('');

    await transport.sendMail({
      from: email_out.identifier,
      to: authUserInfo.purchaser,
      subject: `Compra realizada bajo el código (${authUserInfo.code})`,
      html: `
        <div>
          <h1>Hola ${authUserInfo.purchaser}!!</h1>
          <h2>Gracias por comprar en nuestro sitio</h2>
          <h3>Detalle del pedido:</h3>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              ${productRows}
            </tbody>
          </table>
          <h3>Monto total a abonar: ${roundedAmount}</h3>
          <br>
          <img src="cid:logo" alt="Un logo"/>
        </div>
      `,
      attachments:[{
        filename:'logo.png',
        path:'src/public/images/logo.png',
        cid:'logo',
      }]
    });
  } catch (error) {
    const errorMessage = customizeError('ERROR_SEND_MAIL');
    res.status(500).json({ error: errorMessage });
  }
};
module.exports = {
  create,
  purchaseUser,
};
