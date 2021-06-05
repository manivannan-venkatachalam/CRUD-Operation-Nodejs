const user = require('../middleware/services');
const {secret} = require('../config.json')
const jwt = require('jsonwebtoken');

function token(user){
   jwttoken= jwt.sign(user,secret,{expiresIn:'500s'});
  return jwttoken;
}



module.exports = token;