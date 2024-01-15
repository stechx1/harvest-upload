import mongoose from 'mongoose';

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('Connection established');
    });
  } catch (error) {
    console.log('some thing went wrong ==> ', error);
  }
}
