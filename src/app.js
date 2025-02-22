import express from 'express'
import authController from './controllers/authController.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use('/auth',authController);


app.get('/', (req, res) => {
  res.send('Hello!')
})

export default app