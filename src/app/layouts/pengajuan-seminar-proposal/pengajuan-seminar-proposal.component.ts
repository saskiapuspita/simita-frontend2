import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ruangan } from 'src/app/interfaces/ruangan';
import { SeminarProposal } from 'src/app/interfaces/seminar-proposal';
import { AuthService } from 'src/app/services/auth.service';
import { RuanganService } from 'src/app/services/ruangan.service';
import { SeminarProposalService } from 'src/app/services/seminar-proposal.service';

@Component({
  selector: 'app-pengajuan-seminar-proposal',
  templateUrl: './pengajuan-seminar-proposal.component.html',
  styleUrls: ['./pengajuan-seminar-proposal.component.scss']
})
export class PengajuanSeminarProposalComponent {
  decodedToken: any;
  isVisible: boolean = false;
  formSeminarProposal!: FormGroup;
  listPengajuanSeminarProposal!: SeminarProposal[];
  detailSeminarProposal: any;
  alertMessage: string = '';
  availableRoom$!: Observable<Ruangan[]>;
  waktuSeminar1: string = '07.00 - 09.00';
  waktuSeminar2: string = '08.00 - 10.00';
  waktuSeminar3: string = '09.00 - 11.00';

  constructor(
    private authService: AuthService,
    private seminarProposalService: SeminarProposalService,
    private ruanganService: RuanganService
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    this.formSeminarProposal = this.addSeminarProposalFormGroup();
    this.loadDataPengajuanSeminarProposal();
    this.availableRoom$ = this.fetchAllAvailableRoom();
  }

  // ruangan seminar
  fetchAllAvailableRoom(): Observable<Ruangan[]> {
    return this.ruanganService.fetchAll();
  }

  loadDataPengajuanSeminarProposal() {
    this.seminarProposalService.fetchAll().subscribe((res) => {
      this.listPengajuanSeminarProposal = res;
    });
  }

  addSeminarProposalFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      judulSkripsi: new FormControl('', [Validators.required]),
      tanggalSeminar: new FormControl('', [Validators.required]),
      idRuang: new FormControl('', [Validators.required]),
      waktuSeminar: new FormControl('', [Validators.required])
    });
  }

  submitFormSeminarProposal() {
    console.log('id: ' + this.formSeminarProposal.controls['id'].value);
    this.formSeminarProposal.controls['id'].value;
    if (this.formSeminarProposal.controls['id'].value == null || this.formSeminarProposal.controls['id'].value == '') {
      this.onSubmitAddSeminarProposal(this.formSeminarProposal.value);
    }
  }

  onSubmitAddSeminarProposal(formSeminarProposal: Pick<SeminarProposal, 'id'>): void {
    this.seminarProposalService.create(formSeminarProposal, this.decodedToken.userId).subscribe(() => {
      this.formSeminarProposal.reset();
      this.loadDataPengajuanSeminarProposal();
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
    this.seminarProposalService.delete(id).subscribe(() => {
      this.showAlert('delete');
      this.loadDataPengajuanSeminarProposal();
    });
  }
}
