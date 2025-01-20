import { User } from "./user";

export interface NilaiMataKuliah {
    id: number;
    namaMahasiswa: string;
    nilai: string;
    mataKuliah: number;
    namaMataKuliah: string;
    sks: number;
    minat: number;
    namaMinat: string;
    user: Pick<User, 'id'>;
}
