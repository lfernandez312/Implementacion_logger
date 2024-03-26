const { email_out } = require('../config/services.config')
const transport = require('../utils/nodemailer.util')

class MailAdapter {
  async sendMessage(messageInfo) {
    await transport.sendMail({
        from: email_out.identifier,
        to: messageInfo.email,
        subject:'Bienvenido al sitio Ecomerce',
        html: `
        <div>
          <h1>Hola ${messageInfo.first_name}!!</h1>
          <h2>Ya podes acceder libremente a nuestro sistema</h2>
          <img src="cid:logo" alt="Un logo"/>
        </div>
        `,
        attachments:[{
          filename:'logo.png',
          path:'src/public/images/logo.png',
          cid:'logo',
        }]
      })
    console.log('🚀~ Mail-adapter: ', email_out.identifier + ' to' + messageInfo.email);

  }
}

module.exports = MailAdapter
