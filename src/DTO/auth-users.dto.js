const {v4: uuidv4} = require('uuid')
const { createHash } = require('../utils/utils')

class NewAuthDto {
    constructor(authInfo){
       this.id = uuidv4(),
       this.first_name = authInfo.first_name,
       this.last_name = authInfo.last_name,
       this.phone = authInfo.phone,
       this.email = authInfo.email,
       this.password = createHash(authInfo.password)
       
    }
}

module.exports = NewAuthDto