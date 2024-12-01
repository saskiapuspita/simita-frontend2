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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
