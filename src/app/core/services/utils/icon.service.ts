import { Injectable } from '@angular/core';

@Injectable()
export class IconService {

  getIconPath(iconId) {
    return 'assets/svg/icons.svg#' + iconId;
  }
}
