const { environment } = require("../config/app.config");
const SmsAdapter = require('../adapters/sms.adapter');
const MailAdapter = require('../adapters/mail.adapter');

class MessageFactory {
  constructor() {
    const trimmedEnvironment = environment.trim();

    switch (trimmedEnvironment) {
      case 'prod':
        console.log('Se utiliza nodemailer en modo Prod');
        this.messageManager = new MailAdapter();
        break;

      case 'dev':
        console.log('Se utiliza twilio en modo Dev');
        this.messageManager = new SmsAdapter();
        break;

      default:
        console.log('Ambiente no reconocido');
        break;
    }
  }

  getMessageManager() {
    return this.messageManager;
  }
}

module.exports = MessageFactory;
