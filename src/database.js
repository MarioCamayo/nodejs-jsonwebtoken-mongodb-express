import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/simplejwt')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error(error);
    } 
)
