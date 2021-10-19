import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'projects/vedic-app/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  constructor(private http: HttpClient) {}

  getTime(ip: string = '') {
    const timeUrl: string = `https://omega-fabric-320207.et.r.appspot.com/get_time/?ip=${ip}`;
    return this.http
      .get(timeUrl, { responseType: 'json' })
      .pipe(retry(3), catchError(this.handleError));
  }

  getIp(): Observable<any> {
    const url: string = `https://api.ipify.org/?format=json`;
    return this.http
      .get(url, { responseType: 'json' })
      .pipe(catchError(this.handleError));
  }

  getWeather(q = 'ghaziabad') {
    const header: any = {
      headers: new HttpHeaders().set('key', environment.apiKey),
    };

    return this.http
      .get(`https://api.weatherapi.com/v1/current.json?q=${q}`, header)
      .pipe(catchError(this.handleError));
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
