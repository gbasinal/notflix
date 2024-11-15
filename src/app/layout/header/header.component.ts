import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [

  ]
})
export class HeaderComponent {
  isSearchFormHidden : boolean = true;


  revealSearchForm (){
    this.isSearchFormHidden = !this.isSearchFormHidden;
  }
}
