import { Component, Input, OnInit } from '@angular/core';
import { Parent } from '../../core/types/types'
import { ChildrenDataService } from '../../core/services/data/children.data.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html'
})
export class ParentComponent implements OnInit {
  @Input()
  parent: Parent;

  @Input()
  index: number;

  constructor( public childrenDataService: ChildrenDataService ) { }

  ngOnInit() {
  }

}
