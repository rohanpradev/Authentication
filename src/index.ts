import mongoose from 'mongoose';
import app from './app';

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception... Shutting down');
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 3000;

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined!');
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.error(err);
  }

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

start();
