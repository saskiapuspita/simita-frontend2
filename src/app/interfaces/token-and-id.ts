import { User } from './user';

export interface TokenAndId {
  token: string;
  userId: Pick<User, 'id'>;
  name: Pick<User, 'name'>;
  email: Pick<User, 'email'>;
  role: string;
}
