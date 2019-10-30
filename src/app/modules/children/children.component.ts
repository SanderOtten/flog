import { Component, OnInit } from '@angular/core';
import { ParentDataService } from '../../core/services/data/parent.data.service';
// import { ChildrenDataService } from '../../core/services/data/children.data.service';
import { Child } from '../../core/types/types';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html'
})

export class ChildrenComponent implements OnInit {
  viewOneChild: boolean = false;
  addChild: boolean = false;
  child: Child;

  constructor( public parentDataService: ParentDataService,
//                public childrenDataService: ChildrenDataService,
             ) { }


  ngOnInit() {
    this.parentDataService.pollThisParent();
  }

  showChildsDetails($child) {
    this.child = $child;
    this.viewOneChild = true;
  }

  showAllChildren() {
    this.viewOneChild = false;
  }

  addNewChild() {
    this.viewOneChild = false;
    this.child = new Child;
    this.child.id = null;
    this.child.name = null;
    this.child.dateOfBirth = null;
    this.child.parentsIds = [ this.parentDataService.thisParent.id ];
    this.addChild = true;
  }
}
