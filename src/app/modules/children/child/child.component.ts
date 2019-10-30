import { Component, Input, OnInit } from '@angular/core';
import { Parent, Child } from '../../../core/types/types';
import { GC_PARENT_ID } from '../../../core/types/constants';
import { ChildrenDataService } from '../../../core/services/data/children.data.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html'
})
export class ChildComponent implements OnInit {
  showParents: boolean = false;

  @Input()
  child: Child;

  @Input()
  buttons: boolean;

  @Input()
  edit: boolean;

  constructor( public childrenDataService: ChildrenDataService ) { }

  ngOnInit() {
  }

  showChildsParents() {
    this.showParents = true;
  }

  save() {
    if ( this.child.id === null ) {
      /*
      for ( let parent of this.child.parents ) {
        this.child.parentsIds = [];
        this.child.parentsIds.push( parent.id );
      }
      */

      this.childrenDataService.create (
        this.child.name,
        this.child.dateOfBirth,
        this.child.parentsIds
      );
    }
  }
}
