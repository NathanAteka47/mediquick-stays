import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5606,
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://nathanateka:GunmanNateMarlin@mediquick.afa1ogi.mongodb.net/mediquick-stays?retryWrites=true&w=majority'
  },
  jwt: {
    secret: process.env.JWT_SECRET || '401891',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  client: {
    url: process.env.CLIENT_URL || 'http://localhost:3934'
  },
  nodeEnv: process.env.NODE_ENV || 'development',
  ultraMsg: {
    token: process.env.ULTRAMSG_TOKEN,
    instanceId: process.env.ULTRAMSG_INSTANCE_ID
  }
};