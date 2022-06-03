import mongoose from 'mongoose';
import config from 'config';
import logger from '../utils/logger';

async function connectDB() {
  const dbUri = config.get<string>('dbURI');
  try {
    await mongoose.connect(dbUri);
    logger.info("Database connected!");
  } catch (err) {
    logger.error(`Could not connect to database, msg: ${err}`);
    process.exit(1);
  }
};

export default connectDB;