import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { TimeService } from './home.service';

interface IMuhurat {
  period: string;
  name: string;
}

@Component({
  selector: 'vedic-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  time: string = '';
  unsubscriber: Subject<void> = new Subject();
  weatherObject: any;
  timeObject: any = {}

  muhurat: IMuhurat[] = [
    { period: '06:00-06:48', name: 'Rudra (रुद्र)' },
    { period: '06:48-07:36', name: 'Āhi (आहि)' },
    { period: '07:36-08:24', name: 'Mitra (मित्र)' },
    { period: '08:24-09:12', name: 'Pitṝ (पितृ)' },
    { period: '09:12-10:00', name: 'Vasu (वसु)' },
    { period: '10:00-10:48', name: 'Vārāha (वाराह)' },
    { period: '10:48-11:36', name: 'Viśvedevā (विश्वेदेवा)' },
    { period: '11:36-12:24', name: 'Vidhi (विधि)' },
    { period: '12:24-13:12', name: 'Sutamukhī (सतमुखी)' },
    { period: '13:12-14:00', name: 'Puruhūta (पुरुहूत)' },
    { period: '14:00-14:48', name: 'Vāhinī (वाहिनी)' },
    { period: '14:48-15:36', name: 'Naktanakarā (नक्तनकरा)' },
    { period: '15:36-16:24', name: 'Varuṇa (वरुण)' },
    { period: '16:24-17:12', name: 'Aryaman (अर्यमन्)' },
    { period: '17:12-18:00', name: 'Bhaga (भग)' },
    { period: '18:00-18:48', name: 'Girīśa (गिरीश)' },
    { period: '18:48-19:36', name: 'Ajapāda (अजपाद)' },
    { period: '19:36-20:24', name: 'Ahir-Budhnya (अहिर्बुध्न्य)' },
    { period: '20:24-21:12', name: 'Puṣya (पुष्य)' },
    { period: '21:12-22:00', name: 'Aśvinī (अश्विनी)' },
    { period: '22:00-22:48', name: 'Yama (यम)' },
    { period: '22:48-23:36', name: 'Agni (अग्नि)' },
    { period: '23:36-00:24', name: 'Vidhātṛ (विधातृ)' },
    { period: '00:24-01:12', name: 'Kaṇḍa (क्ण्ड)' },
    { period: '01:12-02:00', name: 'Aditi (अदिति)' },
    { period: '02:00-02:48', name: 'Jīva/Amṛta (जीव/अमृत)' },
    { period: '02:48-03:36', name: 'Viṣṇu (विष्णु)' },
    { period: '03:36-04:24', name: 'Dyumadgadyuti (द्युमद्गद्युति)' },
    { period: '04:24-05:12', name: 'Brahma (ब्रह्म)' },
    { period: '05:12-06:00', name: 'Samudra (समुद्र)' },
  ];

  constructor(private timeService: TimeService) {}

  ngOnInit(): void {
    interval(2 * 1000)
      .pipe(switchMap(() => this.timeService.getIp() ),
      switchMap(ipResponse => this.timeService.getTime(ipResponse.ip) ),
      takeUntil(this.unsubscriber))
      .subscribe((res: any) => {
        this.timeObject = res || {};
        if(res.time) this.time = res.time
        if(res.latlong) {
          this.callWeatherApi(res.latlong);
        }
      })
  }

  callWeatherApi(q: string) {
    this.timeService
      .getWeather(q)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((res: any) => {
        const { current } = res;
        const { wind_kph, humidity, temp_c } = current;
        this.weatherObject = { wind_kph, humidity, temp_c };
      });
  }

  get getDate() {
    return new Date();
  }

  get gmtTime() {
    let currentTime = new Date();
    currentTime.getTimezoneOffset();

    let ISTOffset = 330;

    return new Date(currentTime.getTime() - ISTOffset * 60000);
  }

  get istTime() {
    let currentTime = new Date();
    let currentOffset = currentTime.getTimezoneOffset();

    let ISTOffset = 330;

    return new Date(
      currentTime.getTime() + (ISTOffset + currentOffset) * 60000
    );
  }

  get muhuratName() {
    if (!this.time) return '';
    let muhuratName = '';
    this.muhurat.forEach((element: IMuhurat, index: number) => {
      const { name } = element;

      let time1 = this.time?.split(':')[0]?.trim();
      if (+time1 == index) {
        muhuratName = `| ${name} |`;
      }
    });

    return muhuratName;
  }

  ngOnDestroy() {
    this.unsubscriber?.next();
    this.unsubscriber?.complete();
  }
}
