import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-abort-page',
  imports: [],
  templateUrl: './abort-page.html',
  styleUrl: './abort-page.scss'
})
export class AbortPage implements OnInit {
  
  public contact: string;

  constructor() { 
    this.contact = environment.contactMail;
  }

  ngOnInit(): void {
  }

}
