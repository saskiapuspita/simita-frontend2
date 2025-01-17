import { User } from "./user";

export interface NilaiMataKuliah {
    id: number;
    nilai: string;
    mataKuliah: number;
    user: Pick<User, 'id'>;
}
