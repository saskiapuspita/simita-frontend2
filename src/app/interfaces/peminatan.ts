import { User } from './user';

export interface Peminatan {
  id: number;
  nama: string;
  kuotaPeminatan: number;
  user: Pick<User, 'id'>;
  created: Date;
}
