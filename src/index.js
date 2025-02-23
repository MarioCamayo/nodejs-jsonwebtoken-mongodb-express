import app from './app.js'
import './database.js'
import dotenv from 'dotenv/config';

const init = async () => {
  try {
     await app.listen(3000, () => {
      console.log('Server listening at http://localhost:3000')
    })
  } catch (error) {
    console.error(error)
  }
}

init()