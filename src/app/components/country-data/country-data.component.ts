import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-country-data',
  templateUrl: './country-data.component.html',
  styleUrls: ['./country-data.component.scss'],
})
export class CountryDataComponent  implements OnInit, OnDestroy {
 countryData$ : Observable<any>|undefined;
 subscriptionData : Subscription|undefined;
 allCountries: any[] = [];
 randomCountries: any[] = [];
 playButton: boolean = true;


  constructor(
    private countriesService: CountriesService 
  ) {
    this.countryData$ = this.countriesService.countryData$;
   }

  ngOnInit() {    
    this.countriesService.getAllCountries();
    this.subscriptionData = this.countryData$?.subscribe(data => this.allCountries = data ?  [...data] : []);
    
   
  }
  ngOnDestroy() {
    this.subscriptionData?.unsubscribe();
  }

  play(){
    this.playButton = !this.playButton;
    this.randomCountries = this.countriesService.getRandomCountry(this.allCountries);
  }
   
}
