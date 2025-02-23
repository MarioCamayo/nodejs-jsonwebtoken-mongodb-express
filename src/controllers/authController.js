import { Router } from "express";
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
// import config from '../config.js'
import verifyToken from "./verifyToken.js";

const router = Router()

// Ruta para obtener datos del usuario autenticado
router.get('/dashboard',verifyToken, async(req, res, next)=>{  
  try {
    console.log("🔹 ID del usuario:", req.userId); // 🔍 Verifica el contenido del token en la consola
    // Buscamos el usuario con el ID correcto
    const user =  await User.findById( req.userId, {password: 0})
      if (!user){
        return res.status(404).json({
        auth: false,
        message: 'No user found.'
   })}
      
      res.json(user)
   }catch (error) {
    console.error("❌ Error en GET /enter:", error);
    res.status(500).json({ message: "Error en el servidor" });
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
  
  const token = jwt.sign({
    id: user._id.toString()},
    process.env.SECRET_KEY,
    {expiresIn: 60 * 60 * 24
  })

  console.log("✅ Usuario creado:", user);
  res.json({
    "message": 'Usuario creado',
     "auth":"true", token})
  } catch (error) {
    console.error("❌ Error en POST /signin:", error.message)
    res.status(400).json({
      "message": 'Error al crear usuario',
       "auth":"false"})
    }
})




router.post('/login',async(req, res, next)=>{
  try{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({
        "message": 'Email no existe',
        "auth":"false"
      })
    }

    const validPassword = await user.validatePassword(password)
    if(!validPassword){
      return res.status(401).json({
        "message": 'Contraseña incorrecta',
        "auth":"false", 
        token: null
        })
      }
      const token = jwt.sign({
        id: user._id.toString()},
        process.env.SECRET_KEY,
        {expiresIn: 60 * 60 * 24
       })
    
    // console.log(email, password)
    res.json({
      "message": 'Bienvenido',
      "auth":"true",
      token
    })
  }catch(error){
    console.error(error)
  }
})

export default router