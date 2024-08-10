import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FarmersNavBarComponent } from './components/farmers-nav-bar/farmers-nav-bar.component';
import { VetNavBarComponent } from './components/vet-nav-bar/vet-nav-bar.component';


@NgModule({
  declarations: [AppComponent,FarmersNavBarComponent,VetNavBarComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
