import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIf],
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
