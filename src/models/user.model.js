import {Schema, model} from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema =  new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},

  
})

// Método para encriptar la contraseña
// userSchema.methods.encryptPassword = async function (password) {
//   const salt = await bcrypt.genSalt(10)
//   return await bcrypt.hash(password, salt)
// }

userSchema.methods.encryptPassword = async(password)=> {
  // const salt = await bcryptjs.getSalt(10);
  const saltRounds = 10; // Un número, NO un string

  return bcryptjs.hash(password, saltRounds); 

}

userSchema.methods.validatePassword = async function(password){
  return await bcryptjs.compare(password, this.password)
} 

export default model('User', userSchema)