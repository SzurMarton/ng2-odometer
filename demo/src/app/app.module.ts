import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TmNgOdometerModule } from 'tm-ng-odometer';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TmNgOdometerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }