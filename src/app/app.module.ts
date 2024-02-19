import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CountryDataComponent } from './components/country-data/country-data.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryDataComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({}),
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
