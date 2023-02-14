import { Token } from '../../middlewares/auth.middleware';

declare global {
  namespace Express {
    interface Request {
      token: Token | null;
    }
  }
}
