
// Not in use

expressjwt = require('express-jwt');

// get config vars
const dotenv = require('dotenv');
// access config var
dotenv.config();
const secret = process.env.TOKEN_SECRET;

const identify_client = [
  expressjwt({ secret, algorithms: ['HS256'] }),
  (req, res, next) => {
    this._model.findByPk(req.user.id)
      .then((user) => {
        if (!user) {
          throw { status: 404, message: 'Requested User not found' };
        }
        req.user = user;
        return next();
      });
  }
];