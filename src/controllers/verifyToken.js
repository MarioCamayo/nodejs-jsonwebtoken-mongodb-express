import jwt from 'jsonwebtoken'
import config from '../config.js'

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']
    if (!token)
       return res.status(401).json({
      auth: false,
      message: 'No token provided.' 
    })
     // Verificamos el token
  const decoded = jwt.verify(token, config.SECRET_KEY)
  req.userId = decoded.id
  next()
}

export default verifyToken