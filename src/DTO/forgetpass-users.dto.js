const { createHash } = require('../utils/utils')

class ForgetPassUserDto {
    constructor(userInfo){
       this.email = userInfo.email,
       this.password = createHash(userInfo.password)
       
    }
}

module.exports = ForgetPassUserDto