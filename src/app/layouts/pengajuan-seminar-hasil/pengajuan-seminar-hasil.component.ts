import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ruangan } from 'src/app/interfaces/ruangan';
import { SeminarHasil } from 'src/app/interfaces/seminar-hasil';
import { AuthService } from 'src/app/services/auth.service';
import { RuanganService } from 'src/app/services/ruangan.service';
import { SeminarHasilService } from 'src/app/services/seminar-hasil.service';
import { SkripsiService } from 'src/app/services/skripsi.service';

@Component({
  selector: 'app-pengajuan-seminar-hasil',
  templateUrl: './pengajuan-seminar-hasil.component.html',
  styleUrls: ['./pengajuan-seminar-hasil.component.scss']
})
export class PengajuanSeminarHasilComponent {
  decodedToken: any;
  isVisible: boolean = false;
  formSeminarHasil!: FormGroup;
  listPengajuanSeminarHasil!: SeminarHasil[];
  detailSeminarHasil: any;
  alertMessage: string = ''; 
  availableRoom$!: Observable<Ruangan[]>;
  skripsi!: any;
  time: { hour: 13; minute: 30; } | undefined;
  ruanganList: any;
  selectedRuangan: any = null;
  combinedDateTimeMulaiSeminarString: any;
  combinedDateTimeBerakhirSeminarString: any;
  message: string = '';

  constructor(
    private authService: AuthService,
    private seminarHasilService: SeminarHasilService,
    private ruanganService: RuanganService,
    private skripsiService: SkripsiService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    this.loadJudulPenelitian();
    this.formSeminarHasil = this.addSeminarHasilFormGroup();
    this.loadDataPengajuanSeminarHasil();
    this.availableRoom$ = this.fetchAllAvailableRoom();
  }

  cekKetersediaanRuangan() {
    // this.combineWaktuMulaiSeminarDateTime(
    //   this.formSeminarHasil.get('tanggalSeminar')?.value,
    //   this.convertTime(this.formSeminarHasil.get('waktuMulai')?.value)
    // );
    // this.combineWaktuBerakhirSeminarDateTime(
    //   this.formSeminarHasil.get('tanggalSeminar')?.value,
    //   this.convertTime(this.formSeminarHasil.get('waktuBerakhir')?.value)
    // );

    this.seminarHasilService.cekKetersediaanRuangan(this.formSeminarHasil.value).subscribe(
      response => {
        this.ruanganList = response;
        console.log("list ruangan: " + this.ruanganList);
        
        this.message = "Data berhasil dikirim!";
      },
      error => {
        this.message = "Terjadi kesalahan saat mengirim data!";
      }
    );

  }

  selectRuangan(ruangan: any) {
    this.selectedRuangan = ruangan;
    this.formSeminarHasil.patchValue({
      idRuang: ruangan.id
    });
  }

  // ruangan seminar
  fetchAllAvailableRoom(): Observable<Ruangan[]> {
    return this.ruanganService.fetchAll();
  }

  loadDataPengajuanSeminarHasil() {
    this.seminarHasilService.fetchAll().subscribe((res) => {
      this.listPengajuanSeminarHasil = res;
    });
  }

  addSeminarHasilFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      idSkripsi: new FormControl('', [Validators.required]),
      judulSkripsi: new FormControl('', [Validators.required]),
      tanggalSeminar: new FormControl('', [Validators.required]),
      idRuang: new FormControl('', [Validators.required]),
      waktuMulai: new FormControl('', [Validators.required]),
      waktuBerakhir: new FormControl('', [Validators.required])
    });
  }

  submitFormSeminarHasil() {
    console.log('id: ' + this.formSeminarHasil.controls['id'].value);
    this.formSeminarHasil.controls['id'].value;
    if (this.formSeminarHasil.controls['id'].value == null || this.formSeminarHasil.controls['id'].value == '') {
      this.onSubmitAddSeminarHasil(this.formSeminarHasil.value);
    }
  }

  onSubmitAddSeminarHasil(formSeminarHasil: Pick<SeminarHasil, 'idSkripsi' | 'judulSkripsi'| 'idRuang' | 'tanggalSeminar' | 'waktuMulai' | 'waktuBerakhir'>): void {
    this.seminarHasilService.create(formSeminarHasil, this.decodedToken.userId).subscribe(() => {
      this.formSeminarHasil.reset();
      this.loadDataPengajuanSeminarHasil();
      this.showAlert('add');
    });
  }

  showAlert(action: string): void {
    if (this.isVisible) {
      return;
    }

    if (action == 'add') {
      this.alertMessage = 'Data berhasil ditambahkan!';
    } else if (action == 'update') {
      this.alertMessage = 'Data berhasil diperbarui!';
    } else if (action == 'delete') {
      this.alertMessage = 'Data berhasil dihapus!';
    }

    this.isVisible = true;
    setTimeout(() => (this.isVisible = false), 2500);
  }

  delete(id: any) {
    this.seminarHasilService.delete(id).subscribe(() => {
      this.showAlert('delete');
      this.loadDataPengajuanSeminarHasil();
    });
  }

   // load judul penelitian
   loadJudulPenelitian() {
    this.skripsiService
      .fetchApprovedSkripsiByUserId(this.decodedToken.userId)
      .subscribe((res) => {
        this.skripsi = res;
        this.formSeminarHasil.patchValue({
          idSkripsi: this.skripsi[0].idSkripsi,
          judulSkripsi: this.skripsi[0].judulSkripsi,
        });
        // this.formSeminarHasil.controls['judulSkripsi'].disable();
      });
  }

  convertTime(obj: { hour: number; minute: number; second: number }): string {
    const hours = obj.hour.toString().padStart(2, '0');
    const minutes = obj.minute.toString().padStart(2, '0');
    const seconds = obj.second.toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  combineWaktuMulaiSeminarDateTime(
    selectedTanggaSeminar: any,
    selectedWaktuMulaiSeminar: any
  ) {
    if (selectedTanggaSeminar && selectedWaktuMulaiSeminar) {
      console.log('selectedWaktuMulaiSeminar: ' + selectedWaktuMulaiSeminar);

      const [hours, minutes] = selectedWaktuMulaiSeminar.split(':').map(Number);

      // Buat objek tanggal baru berdasarkan datepicker dan atur jam & menit dari timepicker
      var combinedDateTimeMulaiSeminar = new Date(selectedTanggaSeminar);
      combinedDateTimeMulaiSeminar.setHours(hours, minutes, 0);

      console.log(
        'combinedDateTimeMulaiSeminar: ' + combinedDateTimeMulaiSeminar
      );

      this.combinedDateTimeMulaiSeminarString =
        combinedDateTimeMulaiSeminar.getFullYear() +
        '-' +
        (combinedDateTimeMulaiSeminar.getMonth() + 1) +
        '-' +
        combinedDateTimeMulaiSeminar.getDate() +
        ' ' +
        combinedDateTimeMulaiSeminar.getHours() +
        ':' +
        combinedDateTimeMulaiSeminar.getMinutes() +
        ':' +
        combinedDateTimeMulaiSeminar.getSeconds();

      console.log(
        'combinedDateTimeMulaiSeminarString: ' +
          this.combinedDateTimeMulaiSeminarString
      );
    }
  }

  combineWaktuBerakhirSeminarDateTime(
    selectedTanggaSeminar: any,
    selectedWaktuBerakhirSeminar: any
  ) {
    if (selectedTanggaSeminar && selectedWaktuBerakhirSeminar) {
      console.log(
        'selectedWaktuBerakhirSeminar: ' + selectedWaktuBerakhirSeminar
      );

      const [hours, minutes] = selectedWaktuBerakhirSeminar
        .split(':')
        .map(Number);

      // Buat objek tanggal baru berdasarkan datepicker dan atur jam & menit dari timepicker
      var combinedDateTimeBerakhirSeminar = new Date(selectedTanggaSeminar);
      combinedDateTimeBerakhirSeminar.setHours(hours, minutes, 0);

      console.log(
        'combinedDateTimeBerakhirSeminar: ' + combinedDateTimeBerakhirSeminar
      );

      this.combinedDateTimeBerakhirSeminarString =
        combinedDateTimeBerakhirSeminar.getFullYear() +
        '-' +
        (combinedDateTimeBerakhirSeminar.getMonth() + 1) +
        '-' +
        combinedDateTimeBerakhirSeminar.getDate() +
        ' ' +
        combinedDateTimeBerakhirSeminar.getHours() +
        ':' +
        combinedDateTimeBerakhirSeminar.getMinutes() +
        ':' +
        combinedDateTimeBerakhirSeminar.getSeconds();

      console.log(
        'combinedDateTimeBerakhirSeminarString: ' +
          this.combinedDateTimeBerakhirSeminarString
      );
    }
  }
}
