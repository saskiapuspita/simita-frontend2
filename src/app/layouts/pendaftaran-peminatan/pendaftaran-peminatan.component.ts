import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Peminatan } from 'src/app/interfaces/peminatan';
import { AuthService } from 'src/app/services/auth.service';
import { InterestApiService } from 'src/app/services/interest-api.service';
import { PeminatanService } from 'src/app/services/peminatan.service';

@Component({
  selector: 'app-pendaftaran-peminatan',
  templateUrl: './pendaftaran-peminatan.component.html',
  styleUrls: ['./pendaftaran-peminatan.component.scss'],
})
export class PendaftaranPeminatanComponent implements OnInit {
  decodedToken: any;
  peminatan!: any //Observable<Peminatan[]>;
  selectedPeminatan!: Number;

  optionValue: any;
  optionValue2: any;
  optionValue3: any;
  optionValue4: any;
  optionValue5: any;

  mataKuliahProter1: any;
  mataKuliahProter2: any;
  mataKuliahProter3: any;
  mataKuliahProter4: any;
  mataKuliahProter5: any;

  mataKuliahNMT1: any;
  mataKuliahNMT2: any;
  mataKuliahNMT3: any;
  mataKuliahNMT4: any;
  mataKuliahNMT5: any;

  mataKuliahSosek1: any;
  mataKuliahSosek2: any;
  mataKuliahSosek3: any;
  mataKuliahSosek4: any;
  mataKuliahSosek5: any;

  mataKuliahTHT1: any;
  mataKuliahTHT2: any;
  mataKuliahTHT3: any;
  mataKuliahTHT4: any;
  mataKuliahTHT5: any;

  mataKuliahRPT1: any;
  mataKuliahRPT2: any;
  mataKuliahRPT3: any;
  mataKuliahRPT4: any;
  mataKuliahRPT5: any;

  urutanMinat1: number = 1;
  urutanMinat2: number = 2;
  urutanMinat3: number = 3;
  urutanMinat4: number = 4;
  urutanMinat5: number = 5;

  formPeminatanMhsProter!: FormGroup;

  interests: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private peminatanService: PeminatanService,
    private interestApiService: InterestApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.decodedToken = this.authService.decodeToken();
    this.peminatan = this.fetchAllPeminatan();
    this.formPeminatanMhsProter = this.formBuilder.group({
      matkulProter1: new FormControl(''),
    });
  }

  fetchAllPeminatan(): Observable<Peminatan[]> {
    return this.peminatanService.fetchAll();
  }

  disableProter(id: number): boolean {
    console.log("id : " + id);
      return id === 3;
  }

  disableNMT(id: number): boolean {
    console.log("id : " + id);
      return id === 4;
  }

  onSelectionChange(event: any) {
    const existingSources = this.optionValue;
    const index = existingSources.indexOf(event.source);
    if (index !== -1) {
      this.optionValue = event.value;
    } else {
      this.optionValue.push({
        source: event.source,
        value: event.value,
      });
    }
  }

  onSelectionChangeMataKuliahProter(event: any) {
    const existingSources = this.mataKuliahProter1;
    const index = existingSources.indexOf(event.source);
    if (index !== -1) {
      this.mataKuliahProter1 = event.value;
    } else {
      this.mataKuliahProter1.push({
        source: event.source,
        value: event.value,
      });
    }
  }

  onSelectionChangeMataKuliahNMT(event: any) {
    const existingSources = this.mataKuliahNMT1;
    const index = existingSources.indexOf(event.source);
    if (index !== -1) {
      this.mataKuliahNMT1 = event.value;
    } else {
      this.mataKuliahNMT1.push({
        source: event.source,
        value: event.value,
      });
    }
  }

  onSelectionChangeMataKuliahSosek(event: any) {
    const existingSources = this.mataKuliahSosek1;
    const index = existingSources.indexOf(event.source);
    if (index !== -1) {
      this.mataKuliahSosek1 = event.value;
    } else {
      this.mataKuliahSosek1.push({
        source: event.source,
        value: event.value,
      });
    }
  }

  onSelectionChangeMataKuliahTHT(event: any) {
    const existingSources = this.mataKuliahTHT1;
    const index = existingSources.indexOf(event.source);
    if (index !== -1) {
      this.mataKuliahTHT1 = event.value;
    } else {
      this.mataKuliahTHT1.push({
        source: event.source,
        value: event.value,
      });
    }
  }

  onSelectionChangeMataKuliahRPT(event: any) {
    const existingSources = this.mataKuliahRPT1;
    const index = existingSources.indexOf(event.source);
    if (index !== -1) {
      this.mataKuliahRPT1 = event.value;
    } else {
      this.mataKuliahRPT1.push({
        source: event.source,
        value: event.value,
      });
    }
  }

  getInterests() {
    this.interestApiService.getInterests().subscribe((data: any[]) => {
      this.interests = data;
      console.log(data);
    });
  }

  submitForm() {

  }
}
