import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../core/types/types';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  @Input()
  post: Post;

  constructor() { }

  ngOnInit() {
  }

}
