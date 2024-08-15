import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { PendaftaranPeminatanComponent } from './layouts/pendaftaran-peminatan/pendaftaran-peminatan.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
  { path: 'pendaftaran-peminatan', component: PendaftaranPeminatanComponent, title: 'Pendaftaran Peminatan' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
