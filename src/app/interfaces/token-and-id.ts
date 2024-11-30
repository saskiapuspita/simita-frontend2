import { User } from './user';

export interface TokenAndId {
  token: string;
  userId: Pick<User, 'id'>;
  name: string;
  email: Pick<User, 'email'>;
  role: string;
}
