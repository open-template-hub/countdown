import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountdownComponent } from './component/countdown/countdown.component';

@NgModule({
  declarations: [
    CountdownComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CountdownComponent
  ]
})
export class CountdownModule { }
