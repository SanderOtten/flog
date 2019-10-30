import { Component, OnInit } from '@angular/core';
import { ParentDataService } from '../../core/services/data/parent.data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  constructor( public parentDataService: ParentDataService ) { }

  ngOnInit() {
    this.parentDataService.pollThisParent();
  }
}
