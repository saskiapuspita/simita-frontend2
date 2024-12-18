import { User } from './user';

export interface PeminatanMahasiswa {
  id: number;
  urutanMinat: number;
  pilihanMinat: string;
  idMatkulMinat1: number;
  namaMatkulMinat1: string;
  sksMatkul1: number;
  nilaiMatkulMinat1: string;
  bobotNilaiMatkul1: number;
  idMatkulMinat2: number;
  namaMatkulMinat2: string;
  sksMatkul2: number;
  nilaiMatkulMinat2: string;
  bobotNilaiMatkul2: number;
  idMatkulMinat3: number;
  namaMatkulMinat3: string;
  sksMatkul3: number;
  nilaiMatkulMinat3: string;
  bobotNilaiMatkul3: number;
  idMatkulMinat4: number;
  namaMatkulMinat4: string;
  sksMatkul4: number;
  nilaiMatkulMinat4: string;
  bobotNilaiMatkul4: number;
  idMatkulMinat5: number;
  namaMatkulMinat5: string;
  sksMatkul5: number;
  nilaiMatkulMinat5: string;
  bobotNilaiMatkul5: number;
  ipkMinat: number;
  haveRecommendation: number;
  buktiSuratRekomendasi: any;
  idUser: number;
  created: Date;
}
