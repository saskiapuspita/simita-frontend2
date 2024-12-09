import { Peminatan } from './peminatan';
import { User } from './user';

export interface MataKuliah {
  id: number;
  nama: string;
  sks: string;
  minat: number;
  user: Pick<User, 'id'>;
  created: Date;

  namaMatkul: string;
  namaPeminatan: string;
  idPeminatan: number;
  idMatkul: number;
}
