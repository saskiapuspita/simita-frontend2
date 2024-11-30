import { User } from './user';

export interface Peminatan {
  id: number;
  nama: string;
  user: Pick<User, 'id'>;
  created: Date;
}
