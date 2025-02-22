import { Router } from "express";
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'

const router = Router()

// Ruta para obtener datos del usuario autenticado
router.get('/enter',async(req, res, next)=>{
  try {

  const token = req.headers['x-access-token']
  if (!token)
     return res.status(401).json({
    auth: false,
    message: 'No token provided.'
  })

  // Verificamos el token
  const decoded = jwt.verify(token, config.SECRET_KEY)
  console.log("🔹 Token Decodificado:", decoded); // 🔍 Verifica el contenido del token en la consola
 
  // Buscamos el usuario con el ID correcto
  const user =  await User.findById( decoded.id, {password: 0})
    if (!user){
      return res.status(404).json({
      auth: false,
      message: 'No user found.'

     })
    }
    
    res.json(user)
    } catch (error) {
      console.error(error)
    } 
  })



// Ruta para registrar un nuevo usuario
router.post('/signin',async(req, res, next)=>{
  try {
  const {username, email, password}= req.body
  console.log(username, email, password)

  const user =  new User({
    username, 
    email, 
    password
  })

  user.password = await user.encryptPassword(user.password)
  await user.save()
  
  const token = jwt.sign({id: user._id.toString()}, config.SECRET_KEY, {
    expiresIn: 60 * 60 * 24
  })

  console.log("✅ Usuario creado:", user);
  res.json({"message": 'Usuario creado', "auth":"true", token})
  } catch (error) {
    console.error("❌ Error en POST /signin:", error.message)
    res.status(400).json({"message": 'Error al crear usuario', "auth":"false"})
    }
})




// router.post('/signin',(req, res, next)=>{
//   res.json('login')
// })

export default router