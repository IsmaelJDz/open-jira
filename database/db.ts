import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongooseConnection = {
  isConnected: 0,
};

export const connectDb = async () => {
  if (mongooseConnection.isConnected) {
    console.log('DB is already connected');
    return;
  }

  if (mongoose.connections.length > 0) {
    mongooseConnection.isConnected =
      mongoose.connections[0].readyState;

    if (mongooseConnection.isConnected === 1) {
      console.log('DB is already connected');
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGODB_URI || '');

  mongooseConnection.isConnected = 1;
  console.log('MongoDB connected');
};

export const disconnectDb = async () => {
  if (process.env.NODE_ENV === 'development') return;

  if (mongooseConnection.isConnected === 0) return;

  await mongoose.disconnect();
  console.log('MongoDB disconnected');
};
