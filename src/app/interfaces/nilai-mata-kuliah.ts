import { User } from "./user";

export interface NilaiMataKuliah {
    id: number;
    namaMahasiswa: string;
    nilai: string;
    mataKuliah: number;
    namaMataKuliah: string;
    user: Pick<User, 'id'>;
}
