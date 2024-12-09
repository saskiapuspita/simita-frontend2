import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { PendaftaranPeminatanComponent } from './layouts/pendaftaran-peminatan/pendaftaran-peminatan.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { PengajuanPklComponent } from './layouts/pengajuan-pkl/pengajuan-pkl.component';
import { ProfilComponent } from './layouts/profil/profil.component';
import { ApprovalComponent } from './layouts/approval/approval.component';
import { MasterDosenComponent } from './layouts/master-dosen/master-dosen.component';
import { MasterMahasiswaComponent } from './layouts/master-mahasiswa/master-mahasiswa.component';
import { MasterPeminatanComponent } from './layouts/master-peminatan/master-peminatan.component';
import { MasterMataKuliahComponent } from './layouts/master-mata-kuliah/master-mata-kuliah.component';
import { PengajuanPeminatanComponent } from './layouts/pengajuan-peminatan/pengajuan-peminatan.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    PendaftaranPeminatanComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    PengajuanPklComponent,
    ProfilComponent,
    ApprovalComponent,
    MasterDosenComponent,
    MasterMahasiswaComponent,
    MasterPeminatanComponent,
    MasterMataKuliahComponent,
    PengajuanPeminatanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
