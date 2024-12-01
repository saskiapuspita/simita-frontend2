import { User } from './user';

export interface KelompokPkl {
  id: number;
  idKetua: number;
  namaKetua: string;
  nimKetua: string;
  sksKetua: number;
  noTelpKetua: string;
  idAnggota: number;
  namaAnggota: string;
  sksAnggota: number;
  noTelpAnggota: string;
  statusPengajuanPkl: number;
  idUser: Pick<User, 'id'>;
  created: Date;

  idAnggota1: number;
  idAnggota2: number;
  idAnggota3: number;
  idAnggota4: number;
  idAnggota5: number;
  idLokasiPkl: number;
  idDosenPembimbing: number;

  namaAnggota1: string;
  namaAnggota2: string;
  namaAnggota3: string;
  namaAnggota4: string;
  namaAnggota5: string;
  namaLokasi: string;
}
