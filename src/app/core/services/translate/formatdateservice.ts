import { Injectable, OnInit } from '@angular/core';
import * as moment from 'moment';

export class FormatDateService implements OnInit {

  dateFormat     = 'YYYY-MM-DD';
  timeFormat     = 'HH:mm';
  dateTimeFormat = this.dateFormat + ' ' + this.timeFormat;

  now;
  currentDate;
  currentTime;
  currentDateTime;

  initialized: boolean = false;

  constructor() {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    if ( !this.initialized ) {
      this.now             = moment();
      this.currentDate     = moment(this.now).format(this.dateFormat);
      this.currentTime     = moment(this.now).format(this.timeFormat);
      this.currentDateTime = moment(this.now).format(this.dateTimeFormat);
      this.initialized     = true;
    }
  }

  strToDate ( $datestr, $format=this.dateTimeFormat ) {
    return moment($datestr, $format);
  }

  dateToStr ( $date, $format=this.dateTimeFormat ) {
    return moment($date).format($format);
  }

  dateStr ( $year, $month, $day ) {
    return $year + '-' + $month + '-' + $day;
  }

  timeStr ( $hour, $minute, $second ) {
    return $hour + ':' + $minute + ':' + $second;
  }

  dateTimeStr ( $datestr, $timestr ) {
    return $datestr + ' ' + $timestr;
  }

  compareDates ( $datea, $dateb ) {
    if ( $datea > $dateb ) {
      return  1;
    } else if ( $datea < $dateb)  {
      return -1;
    } else {
      return  0;
    }
  }

  compareDateStr ( $datestra, $datestrb, $format ) {
    return this.compareDates ( this.strToDate ( $datestra, $format )
                             , this.strToDate ( $datestrb, $format )
                             );
  }

  checkFutureDateStr ( $date: string, $format: string=this.dateFormat ) {
    this.initialize();

    if ( this.compareDates ( this.strToDate($date, $format)
                           , this.strToDate(this.currentDate, $format)
                           ) === 1 ) {
      return true;
    } else {
      return false;
    }
  }
}
