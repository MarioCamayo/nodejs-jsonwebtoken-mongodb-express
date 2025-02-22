import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/simplejwt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error(error);
    } 
)
