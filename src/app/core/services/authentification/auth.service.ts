import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { GC_AUTH_TOKEN, GC_PARENT_ID, GC_PARENT_NAME } from '../../types/constants';

@Injectable()
export class AuthService {
  private parentId: string = null;
  private _isAuthenticated = new BehaviorSubject(false);

  constructor() {
  }

  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  saveParentData(id: string, name: string, token: string) {
    localStorage.setItem(GC_PARENT_ID, id);
    localStorage.setItem(GC_PARENT_NAME, name);
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.setParentId(id);
  }

  setParentId(id: string) {
    this.parentId = id;
    this._isAuthenticated.next(true);
  }

  logout() {
    localStorage.removeItem(GC_PARENT_ID);
    localStorage.removeItem(GC_PARENT_NAME);
    localStorage.removeItem(GC_AUTH_TOKEN);
    this.parentId = null;
    this._isAuthenticated.next(false);
  }

  autoLogin() {
    const id = localStorage.getItem(GC_PARENT_ID);

    if (id) {
      this.setParentId(id);
    }
  }
}
