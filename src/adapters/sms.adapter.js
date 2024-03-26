const { sms } = require('../config/services.config')
const client = require('../utils/twilio.util')

class SmsAdapter {
  async sendMessage(messageInfo) {

    await client.messages.create({
      body: `Hola ${messageInfo.first_name} bienvenido a nuestro sitio`,
      from: sms.twilioSmsNumber,
      to:messageInfo.phone,
      
    })
    console.log('🚀~ sms-adapter: ', sms.twilioSmsNumber + ' to' + messageInfo.phone);

  }
}

module.exports = SmsAdapter
