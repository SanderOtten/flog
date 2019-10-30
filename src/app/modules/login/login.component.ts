import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParentDataService } from '../../core/services/data/parent.data.service'
import * as moment from 'moment';

@Component({
  selector: 'flog-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  login: boolean = true; // switch between Login and SignUp
  email: string = '';
  password: string = '';
  name: string = '';
  dateOfBirth: moment.Moment = null;

  constructor(private parentDataService: ParentDataService) {
  }

  ngOnInit() {
  }

  confirm() {
    if ( this.login ) {
      this.signin();
    } else {
      this.signup();
    }
  }

  signin() {
    this.parentDataService.signin( this.email, this.password );
  }

  signup() {
    this.parentDataService.create( this.name
                                 , this.email
                                 , this.password
                                 , moment(this.dateOfBirth).format('YYYY-MM-DD')
                                 );
  }
}
