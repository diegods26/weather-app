import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherDatas } from '../../../../models/weather';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeatherCardComponent } from "../../components/weather-card/weather-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wheather-home',
  imports: [FormsModule,
    FontAwesomeModule,
    WeatherCardComponent,
    CommonModule],
  templateUrl: './wheather-home.component.html',
  styleUrl: './wheather-home.component.scss'
})
export class WheatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  initialCityName: string = 'São Paulo';
  weatherDatas!: WeatherDatas;
  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
    this.weatherService.getWeatherDatas(cityName)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: response => {
        response && (this.weatherDatas = response)
        console.log(this.weatherDatas);
      },
      error: error => console.log(error)
    })
  }

  onSubmit(): void {
    this.getWeatherDatas(this.initialCityName);
    this.initialCityName = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
