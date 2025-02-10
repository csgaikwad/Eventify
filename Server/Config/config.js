import dotenv from "dotenv";

dotenv.config();

const config = {
  database: {
    url: process.env.MONGO_URL,
  },
  server: {
    port: process.env.PORT || 8000,
  },
  secrets: {
    jwtSecret: process.env.SECRET_KEY,
  },
};

export default config;
