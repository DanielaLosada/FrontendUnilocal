import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from '../Auth/login.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIf,LoginComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  asideOpen = true;
  profileOpen = false;
 

  toggleAsideOpen() {
    this.asideOpen = !this.asideOpen;
   
  }

  toggleProfileOpen() {
    this.profileOpen = !this.profileOpen;
  }


  

}
