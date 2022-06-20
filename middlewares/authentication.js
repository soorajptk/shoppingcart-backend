const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    // throw new UnauthenticatedError('Authentication invalid')
    return res.status(401).json({err:"Authentication invalid"})
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.id, name: payload.name}
    next()
  } catch (error) {
    return res.status(401).json({err:"Authentication invalid"})
    // throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth
