import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component( {
  selector: 'oth-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: [ './countdown.component.scss' ]
} )
export class CountdownComponent implements OnChanges {
  FULL_DASH_ARRAY = 283;

  @Input() warningThreshold: any;
  @Input() errorThreshold: any;

  colorCodes = {
    success: 'success',
    warning: 'warning',
    error: 'error'
  };

  @Input() totalTime?: number = undefined;
  @Input() timeLeft?: number = undefined;
  remainingPathColor: any;

  constructor() {
    // Intentionally blank
  }

  ngOnChanges( _: SimpleChanges ): void {
    if ( !this.warningThreshold || !this.errorThreshold ) {
      this.warningThreshold = ( this.totalTime ?? 1) * 2 / 3;
      this.errorThreshold = ( this.totalTime ?? 1 ) / 3;
    }

    this.setCircleDasharray();
    this.setRemainingPathColor( this.timeLeft );
  }

  setRemainingPathColor( timeLeft?: number ) {
    if( !timeLeft) {
      return
    }

    const { error, warning, success } = this.colorCodes;
    if ( timeLeft <= this.errorThreshold ) {
      this.remainingPathColor = error;
    } else if ( timeLeft <= this.warningThreshold ) {
      this.remainingPathColor = warning;
    } else {
      this.remainingPathColor = success;
    }
  }

  calculateTimeFraction() {
    const rawTimeFraction = ( this.timeLeft ?? 1) / ( this.totalTime ?? 1 );
    return rawTimeFraction === 0 ? 0 : rawTimeFraction - ( 1 / ( this.totalTime ?? 1) ) * ( 1 - rawTimeFraction );
  }

  setCircleDasharray() {
    const circleDasharray = `${ ( this.calculateTimeFraction() * this.FULL_DASH_ARRAY
    ).toFixed( 0 ) } 283`;
    document
    .getElementById( 'base-timer-path-remaining' )?.setAttribute( 'stroke-dasharray', circleDasharray );
  }

}

