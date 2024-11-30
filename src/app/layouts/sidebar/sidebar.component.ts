import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  UserRole! : any;

  constructor() {}

  ngOnInit() {
    this.UserRole = localStorage.getItem('userrole');
  }
}
