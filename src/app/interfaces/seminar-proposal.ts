import { User } from './user';

export interface SeminarProposal {
  id: number;
  idUser: Pick<User, 'id'>;
  judulSkripsi: string;
  idRuang: number;
  namaRuang: string;
  tanggalSeminar: Date;
  waktuSeminar: string;
  statusPengajuan: number;
  created: Date;
}
