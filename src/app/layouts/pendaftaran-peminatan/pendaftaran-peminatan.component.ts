import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterestApiService } from 'src/app/services/interest-api.service';

@Component({
  selector: 'app-pendaftaran-peminatan',
  templateUrl: './pendaftaran-peminatan.component.html',
  styleUrls: ['./pendaftaran-peminatan.component.scss']
})

export class PendaftaranPeminatanComponent implements OnInit{

  optionValue: any;
  optionValue2: any;
  optionValue3: any;
  optionValue4: any;
  optionValue5: any;
  interests: any[] = [];

  constructor(private interestApiService: InterestApiService, private router: Router) {}

  ngOnInit() {
    this.getInterests();
  }

  onSelectionChange(event: any) {
    const existingSources = this.optionValue;
    const index = existingSources.indexOf(event.source);
    if (index !== -1) {
      this.optionValue = event.value
    } else {
      this.optionValue.push({
        source: event.source,
        value: event.value
      });
    }
  }

  getInterests() {
    this.interestApiService.getInterests().subscribe((data: any[]) => {
      this.interests = data;
      console.log(data);
    });
  }
}
