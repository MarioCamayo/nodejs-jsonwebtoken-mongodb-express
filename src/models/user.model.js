import {Schema, model} from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema =  new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},

})

userSchema.methods.encryptPassword = async(password)=> {
  // const salt = await bcryptjs.getSalt(10);
  const saltRounds = 10; // Un número, NO un string

  return bcryptjs.hash(password, saltRounds);

}

export default model('User', userSchema)