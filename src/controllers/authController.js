import { Router } from "express";
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'

const router = Router()

router.get('/bienvenido',(req, res, next)=>{
  res.json('bienvenido')
})


router.post('/signin',async(req, res, next)=>{
  const {username, email, password}= req.body
  console.log(username, email, password)

  const user =  new User({
    username, 
    email, 
    password
  })

  user.password = await user.encryptPassword(user.password)
  await user.save()
  
  const token = jwt.sign({id: user._id}, config.SECRET, {
    expiresIn: 60 * 60 * 24
  })

  console.log(user)
  res.json({message: 'Usuario creado', token})
})




router.post('/signin',(req, res, next)=>{
  res.json('login')
})

export default router