import { Component } from '@angular/core';
import { Skripsi } from 'src/app/interfaces/skripsi';
import { SkripsiService } from 'src/app/services/skripsi.service';

@Component({
  selector: 'app-list-penelitian',
  templateUrl: './list-penelitian.component.html',
  styleUrls: ['./list-penelitian.component.scss']
})
export class ListPenelitianComponent {
  listApprovedSkripsi!: Skripsi[];

  constructor(
    private skripsiService: SkripsiService
  ) {}

  ngOnInit() {
    this.loadDataApprovedSkripsi();
  }

  loadDataApprovedSkripsi() {
    this.skripsiService.fetchAllApprovedSkripsi().subscribe((res) => {
      this.listApprovedSkripsi = res;
    });
  }
}
