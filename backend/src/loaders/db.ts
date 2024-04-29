// db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    console.log('Db bağlantısı başarılı...');
  } catch (err) {
    console.error('Db bağlantısı başarısız:', err);
    process.exit(1); // Uygulamayı güvenli bir şekilde kapat
  }
};

export { connectDB };
