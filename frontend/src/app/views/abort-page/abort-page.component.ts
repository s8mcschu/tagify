import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tp-abort-page',
  templateUrl: './abort-page.component.html',
  styleUrls: ['./abort-page.component.scss']
})
export class AbortPageComponent implements OnInit {

  public contact: string;

  constructor() { 
    this.contact = environment.contactMail;
  }

  ngOnInit(): void {
  }

}
