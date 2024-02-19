import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  REST_API: string = "https://restcountries.com/v3.1/";
  private countrySubject = new BehaviorSubject<any>(null);
  public countryData$ = this.countrySubject.asObservable();


  constructor(
    private http: HttpClient,
  ) { }

  getAllCountries() {
   this.http.get(this.REST_API + "all").pipe(take(1)).subscribe(data => this.countrySubject.next(data))
  }

  getRandomCountry( getAllCountries: any) {
    
    const randomsCountry: any[] = []
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * getAllCountries.length);
      if( randomsCountry.includes(getAllCountries[randomIndex]) ) {
        i--;
        continue;
      }
      randomsCountry.push(getAllCountries[randomIndex]);
    }

    return randomsCountry

  }



}
