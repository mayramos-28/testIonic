import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-country-data',
  templateUrl: './country-data.component.html',
  styleUrls: ['./country-data.component.scss'],
})
export class CountryDataComponent implements OnInit, OnDestroy {
  countryData$: Observable<any> | undefined;
  subscriptionData: Subscription | undefined;
  allCountries: any[] = [];
  randomCountries: any[] = [];
  playCountries: any[] = [];
  playButton: boolean = true;
  maxScore: string | undefined | null;
 


  constructor(
    public countriesService: CountriesService,
    private alertController: AlertController
  ) {
    this.countryData$ = this.countriesService.countryData$;
  }

  ngOnInit() {
    this.countriesService.getAllCountries();
    this.subscriptionData = this.countryData$?.subscribe(data => this.allCountries = data ? [...data] : []);
    this.setMaxScore()
  }
  ngOnDestroy() {
    this.subscriptionData?.unsubscribe();
  }

  shuffleArray(array: any[]) {
    const newArr = [...array];   
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]]; 
    }  
    return newArr;
  }
  

  play() {
    this.countriesService.wrongAnswer();
    this.setMaxScore();
    this.playButton = !this.playButton;
    this.randomCountries = this.countriesService.getRandomCountry(this.allCountries);
    this.playCountries = this.shuffleArray(this.randomCountries);
  }

  replay() {
    let maxScoreFlags = 0;
    this.randomCountries = this.countriesService.getRandomCountry(this.allCountries);
    this.playCountries = this.shuffleArray(this.randomCountries);
    this.countriesService.counterData$.subscribe(score => {
      console.log(score);
      maxScoreFlags = score
      this.checkMaxScore(maxScoreFlags);
    }).unsubscribe()
  }

  checkMaxScore(score: number){
    let localScore: string | number | null = localStorage.getItem('maxScoreFlags');
    if(localScore && Number(localScore) < score){
      localStorage.setItem('maxScoreFlags', score.toString());
    }
  }

  setMaxScore(){
    if(!localStorage.getItem('maxScoreFlags')){
      localStorage.setItem('maxScoreFlags', '0')
    }else{
      this.maxScore = localStorage.getItem('maxScoreFlags') ? localStorage.getItem('maxScoreFlags') : undefined
    }
  }

  checkAnswer(country: any, ) {
    if (country === this.randomCountries[0].name.common) {      
      this.countriesService.correctAnswer();
      this.correctAlert(this.randomCountries[0]);      
    }
    else {
      this.IncorrectAlert(this.randomCountries[0].name.common)
    }
  }

  async correctAlert( randomCountries: any) {
    const alert = await this.alertController.create({
      header: randomCountries.name.common ,
      subHeader: 'Capital: ' + randomCountries.capital +  ' Region: ' + randomCountries.region ,
      message:  ' Population: ' + randomCountries.population + " inhabitants",
      buttons:[{  text: 'Next',cssClass:"btn-alert",  handler: () => {this.replay()}}],
      cssClass: "alert-custom"
    });

    await alert.present();
  }

  async IncorrectAlert( correctCountry: any) {
    const alert = await this.alertController.create({
      header: 'Incorrect Answer!',
      subHeader: 'The correct answer was:',
      message:   correctCountry  ,
      buttons: [{text: 'Try Again',cssClass:"btn-alert", handler: () => {this.play()}}],
      cssClass: "alert-custom"
    });

    await alert.present();
  }

}
