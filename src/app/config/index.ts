import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  APP_ENV: process.env.APP_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  salt_rounds: process.env.SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
};
