import { Time } from "@angular/common";
import { User } from "./user";

export interface SeminarHasil {
  id: number;
  idUser: Pick<User, 'id'>;
  idSkripsi: number;
  judulSkripsi: string;
  idRuang: number;
  namaRuang: string;
  tanggalSeminar: Date;
  waktuMulai: any;
  waktuBerakhir: any;
  statusPengajuan: number;
  created: Date;
}
