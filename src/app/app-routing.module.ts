import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { PendaftaranPeminatanComponent } from './layouts/pendaftaran-peminatan/pendaftaran-peminatan.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HeaderComponent } from './layouts/header/header.component';
import { PengajuanPklComponent } from './layouts/pengajuan-pkl/pengajuan-pkl.component';
import { ProfilComponent } from './layouts/profil/profil.component';
import { ApprovalComponent } from './layouts/approval/approval.component';
import { MasterDosenComponent } from './layouts/master-dosen/master-dosen.component';
import { MasterMahasiswaComponent } from './layouts/master-mahasiswa/master-mahasiswa.component';
import { MasterPeminatanComponent } from './layouts/master-peminatan/master-peminatan.component';
import { MasterMataKuliahComponent } from './layouts/master-mata-kuliah/master-mata-kuliah.component';
import { PengajuanPeminatanComponent } from './layouts/pengajuan-peminatan/pengajuan-peminatan.component';
import { MasterLokasiSkripsiComponent } from './layouts/master-lokasi-skripsi/master-lokasi-skripsi.component';
import { PengajuanJudulPenelitianComponent } from './layouts/pengajuan-judul-penelitian/pengajuan-judul-penelitian.component';
import { ListPenelitianComponent } from './layouts/list-penelitian/list-penelitian.component';
import { MasterRuanganComponent } from './layouts/master-ruangan/master-ruangan.component';
import { PengajuanSeminarProposalComponent } from './layouts/pengajuan-seminar-proposal/pengajuan-seminar-proposal.component';
import { KuotaDosenComponent } from './layouts/kuota-dosen/kuota-dosen.component';
import { NilaiMataKuliahComponent } from './layouts/nilai-mata-kuliah/nilai-mata-kuliah.component';
import { StatusJudulPenetianComponent } from './layouts/status-judul-penetian/status-judul-penetian.component';
import { ApprovalJudulPenelitianComponent } from './layouts/approval-judul-penelitian/approval-judul-penelitian.component';
import { RekapitulasiPeminatanComponent } from './layouts/rekapitulasi-peminatan/rekapitulasi-peminatan.component';
import { PengajuanSeminarHasilComponent } from './layouts/pengajuan-seminar-hasil/pengajuan-seminar-hasil.component';
import { MonitoringTugasAkhirComponent } from './layouts/monitoring-tugas-akhir/monitoring-tugas-akhir.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  {
    path: 'header',
    component: HeaderComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [AuthGuardService],
  },
  {
    path: 'pendaftaran-peminatan',
    component: PendaftaranPeminatanComponent,
    title: 'Pendaftaran Peminatan',
    canActivate: [AuthGuardService],
  },
  {
    path: 'pengajuan-pkl',
    component: PengajuanPklComponent,
    title: 'Pengajuan Pkl',
    canActivate: [AuthGuardService],
  },
  {
    path: 'pengajuan-peminatan',
    component: PengajuanPeminatanComponent,
    title: 'Pengajuan Peminatan',
    canActivate: [AuthGuardService],
  },
  {
    path: 'rekapitulasi-peminatan',
    component: RekapitulasiPeminatanComponent,
    title: 'Rekapitulasi Peminatan',
    canActivate: [AuthGuardService],
  },
  {
    path: 'user-profil',
    component: ProfilComponent,
    title: 'Profil Pengguna',
    canActivate: [AuthGuardService],
  },
  {
    path: 'approval',
    component: ApprovalComponent,
    title: 'Approval',
    canActivate: [AuthGuardService],
  },
  {
    path: 'master-mahasiswa',
    component: MasterMahasiswaComponent,
    title: 'Master Mahasiswa',
    canActivate: [AuthGuardService],
  },
  {
    path: 'master-dosen',
    component: MasterDosenComponent,
    title: 'Master Dosen',
    canActivate: [AuthGuardService],
  },
  {
    path: 'master-peminatan',
    component: MasterPeminatanComponent,
    title: 'Master Peminatan',
    canActivate: [AuthGuardService],
  },
  {
    path: 'master-mata-kuliah',
    component: MasterMataKuliahComponent,
    title: 'Master Mata Kuliah',
    canActivate: [AuthGuardService],
  },
  {
    path: 'master-lokasi-skripsi',
    component: MasterLokasiSkripsiComponent,
    title: 'Master Lokasi Skripsi',
    canActivate: [AuthGuardService],
  },
  {
    path: 'pengajuan-judul-penelitian',
    component: PengajuanJudulPenelitianComponent,
    title: 'Pengajuan Judul Penelitian',
    canActivate: [AuthGuardService],
  },
  {
    path: 'status-judul-penelitian',
    component: StatusJudulPenetianComponent,
    title: 'Status Pengajuan Judul Penelitian',
    canActivate: [AuthGuardService],
  },
  {
    path: 'approval-judul-penelitian',
    component: ApprovalJudulPenelitianComponent,
    title: 'Approval Judul Penelitian',
    canActivate: [AuthGuardService],
  },
  {
    path: 'list-penelitian',
    component: ListPenelitianComponent,
    title: 'List Penelitian',
    canActivate: [AuthGuardService],
  },
  {
    path: 'master-ruangan',
    component: MasterRuanganComponent,
    title: 'Ruangan',
    canActivate: [AuthGuardService],
  },
  {
    path: 'pengajuan-seminar-proposal',
    component: PengajuanSeminarProposalComponent,
    title: 'Pengajuan Seminar Proposal',
    canActivate: [AuthGuardService],
  },
  {
    path: 'pengajuan-seminar-hasil',
    component: PengajuanSeminarHasilComponent,
    title: 'Pengajuan Seminar Hasil',
    canActivate: [AuthGuardService],
  },
  {
    path: 'kuota-dosen',
    component: KuotaDosenComponent,
    title: 'Kuota Dosen',
    canActivate: [AuthGuardService],
  },
  {
    path: 'nilai-mata-kuliah',
    component: NilaiMataKuliahComponent,
    title: 'Nilai Mata Kuliah',
    canActivate: [AuthGuardService],
  },
  {
    path: 'monitoring-tugas-akhir',
    component: MonitoringTugasAkhirComponent,
    title: 'Monitoring Tugas Akhir',
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
