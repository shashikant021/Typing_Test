import { Component, OnInit } from '@angular/core';
import { Navigation } from '../models/models';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{
  
  navigationList: Navigation[];

  constructor(){
    this.navigationList = [
      {
        name: 'Simple Test',
        path: 'simple'
      },
      {
        name: 'Advanced Test',
        path: 'advanced'
      },
    ]
  }

  ngOnInit(): void {
    
  }
}
