import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { applyPlugin } from 'jspdf-autotable'
import { Observable } from 'rxjs';
import { Dosen } from 'src/app/interfaces/dosen';
import { MonitoringTugasAkhir } from 'src/app/interfaces/monitoring-tugas-akhir';
import { AuthService } from 'src/app/services/auth.service';
import { DetailMonitoringTugasAkhirService } from 'src/app/services/detail-monitoring-tugas-akhir.service';
import { MasterDosenService } from 'src/app/services/master-dosen.service';
import { MonitoringTugasAkhirService } from 'src/app/services/monitoring-tugas-akhir.service';

@Component({
  selector: 'app-monitoring-tugas-akhir',
  templateUrl: './monitoring-tugas-akhir.component.html',
  styleUrls: ['./monitoring-tugas-akhir.component.scss']
})
export class MonitoringTugasAkhirComponent {
  decodedToken: any;
  isVisible: boolean = false;
  formMonitoringSkripsi!: FormGroup;
  formDetailMonitoringSkripsi!: FormGroup;
  listPengajuanMonitoringSkripsi!: MonitoringTugasAkhir[];
  detailMonitoringSkripsi: any;
  alertMessage: string = '';
  message: string = '';
  tugasAkhir: any;
  namaDosen$!: Observable<Dosen[]>;
  listDetailTugasAkhir!: any;

  @ViewChild('pdfTable', {static: false}) pdfTable: 
  ElementRef | undefined;

  constructor(
    private authService: AuthService,
    private monitoringTugasAkhirService: MonitoringTugasAkhirService,
    private detailMonitoringTugasAkhirService: DetailMonitoringTugasAkhirService,
    private masterDosenService: MasterDosenService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    // this.loadJudulPenelitian();
    this.loadJudulSkripsiByUserId();
    this.namaDosen$ = this.loadDosenPembimbing();
    this.formMonitoringSkripsi = this.addMonitoringSkripsiFormGroup();
    this.formDetailMonitoringSkripsi = this.addDetailMonitoringSkripsiFormGroup();
  }

  // load dosen pembimbing
  loadDosenPembimbing(): Observable<Dosen[]> {
    return this.masterDosenService.fetchAll();
  }

  addMonitoringSkripsiFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      idDosenPembimbing1: new FormControl('', [Validators.required]),
      idDosenPembimbing2: new FormControl('', [Validators.required]),
      judulSkripsi: new FormControl('', [Validators.required])
    });
  }

  submitFormMonitoringSkripsi() {
    console.log('id: ' + this.formMonitoringSkripsi.controls['id'].value);
    this.formMonitoringSkripsi.controls['id'].value;
    if (this.formMonitoringSkripsi.controls['id'].value == null || this.formMonitoringSkripsi.controls['id'].value == '') {
      this.onSubmitAddMonitoringSkripsi(this.formMonitoringSkripsi.value);
    }
  }

  onSubmitAddMonitoringSkripsi(formMonitoringSkripsi: Pick<MonitoringTugasAkhir, 'idDosenPembimbing1' | 'idDosenPembimbing2' | 'judulSkripsi'>): void {
    this.monitoringTugasAkhirService.create(formMonitoringSkripsi, this.decodedToken.userId).subscribe(() => {
      this.formMonitoringSkripsi.reset();
      // this.loadDataPengajuanMonitoringSkripsi();
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
    this.monitoringTugasAkhirService.delete(id).subscribe(() => {
      this.showAlert('delete');
      // this.loadDataPengajuanMonitoringSkripsi(); 
      // TODO load data detail monitoring tugas akhir by idUser
    });
  }

  addDetailMonitoringSkripsiFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      idMonitoringSkripsi: new FormControl('', [Validators.required]),
      tanggalMonitoring: new FormControl('', [Validators.required]),
      uraianKegiatan: new FormControl('', [Validators.required])
    });
  }

  submitFormDetailMonitoringSkripsi() {
    console.log('id: ' + this.formDetailMonitoringSkripsi.controls['id'].value);
    this.formDetailMonitoringSkripsi.controls['id'].value;
    if (this.formDetailMonitoringSkripsi.controls['id'].value == null || this.formDetailMonitoringSkripsi.controls['id'].value == '') {
      this.onSubmitAddDetailMonitoringSkripsi(this.formDetailMonitoringSkripsi.value);
    }
  }

  onSubmitAddDetailMonitoringSkripsi(formDetailMonitoringSkripsi: Pick<MonitoringTugasAkhir, 'idMonitoringSkripsi' | 'tanggalMonitoring' | 'uraianKegiatan'>): void {
    console.log("idmonitoringtugasakhir : " + formDetailMonitoringSkripsi.idMonitoringSkripsi);
    this.detailMonitoringTugasAkhirService.create(formDetailMonitoringSkripsi).subscribe(() => {
      this.formDetailMonitoringSkripsi.reset();
      this.showAlert('add');
    });
  }

   // load judul penelitian
   loadJudulSkripsiByUserId() {
    this.monitoringTugasAkhirService
      .fetchByUserId(this.decodedToken.userId)
      .subscribe((res) => {
        this.tugasAkhir = res;
        this.formDetailMonitoringSkripsi.patchValue({
          idMonitoringSkripsi: this.tugasAkhir[0].id
        });
        console.log("idmonitoringtugasakhir: " + this.tugasAkhir[0].id);
        this.detailMonitoringTugasAkhirService.fetchByIdMonitoring(this.tugasAkhir[0].id).subscribe((res) => {
        this.listDetailTugasAkhir = res;});
        // this.formMonitoringSkripsi.controls['judulSkripsi'].disable();
      });
  }

  downloadPDF() {
    const doc = new jsPDF()

   doc.autoTable({ html: '#pdfTable' })
    doc.save('table.pdf')
  }
}
