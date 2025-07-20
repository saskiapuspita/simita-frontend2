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
import { MasterLokasiSkripsiComponent } from './layouts/master-lokasi-skripsi/master-lokasi-skripsi.component';
import { PengajuanJudulPenelitianComponent } from './layouts/pengajuan-judul-penelitian/pengajuan-judul-penelitian.component';
import { ListPenelitianComponent } from './layouts/list-penelitian/list-penelitian.component';
import { MasterRuanganComponent } from './layouts/master-ruangan/master-ruangan.component';
import { PengajuanSeminarProposalComponent } from './layouts/pengajuan-seminar-proposal/pengajuan-seminar-proposal.component';
import { KuotaDosenComponent } from './layouts/kuota-dosen/kuota-dosen.component';
import { NilaiMataKuliahComponent } from './layouts/nilai-mata-kuliah/nilai-mata-kuliah.component';
import { CustomPaginationComponent } from './layouts/custom-pagination/custom-pagination.component';
import { StatusJudulPenetianComponent } from './layouts/status-judul-penetian/status-judul-penetian.component';
import { ApprovalJudulPenelitianComponent } from './layouts/approval-judul-penelitian/approval-judul-penelitian.component';
import { FilterPipe } from './filter.pipe';
import { RekapitulasiPeminatanComponent } from './layouts/rekapitulasi-peminatan/rekapitulasi-peminatan.component';
import { PengajuanSeminarHasilComponent } from './layouts/pengajuan-seminar-hasil/pengajuan-seminar-hasil.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateTimePickerComponent } from './layouts/date-time-picker/date-time-picker.component';
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { MonitoringTugasAkhirComponent } from './layouts/monitoring-tugas-akhir/monitoring-tugas-akhir.component';

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
    PengajuanPeminatanComponent,
    MasterLokasiSkripsiComponent,
    PengajuanJudulPenelitianComponent,
    ListPenelitianComponent,
    MasterRuanganComponent,
    PengajuanSeminarProposalComponent,
    KuotaDosenComponent,
    NilaiMataKuliahComponent,
    CustomPaginationComponent,
    StatusJudulPenetianComponent,
    ApprovalJudulPenelitianComponent,
    FilterPipe,
    RekapitulasiPeminatanComponent,
    PengajuanSeminarHasilComponent,
    DateTimePickerComponent,
    MonitoringTugasAkhirComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule
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
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIcons(faCalendar, faClock);
  }
}
