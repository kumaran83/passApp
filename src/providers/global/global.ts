import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GlobalProvider {
  private baseUrl: string = 'http://passonnow.com/';
  constructor(public http: HttpClient) { }
  // Get Request
  getData(AppUrl: string): Observable<any> {
    let reqUrl: string = this.baseUrl + AppUrl;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(reqUrl, httpOptions).pipe(
      catchError(this.handleError)
    );

  }
  // Post Request
  postData(AppUrl: string, body: Object): Observable<any> {
    let reqUrl: string = this.baseUrl + AppUrl;
    let bodyString = JSON.stringify(body); // Stringify payload
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(reqUrl, bodyString, httpOptions) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  // Put Rquest
  putData(AppUrl: string, body: Object): Observable<any> {
    let reqUrl: string = this.baseUrl + AppUrl;
    let bodyString = JSON.stringify(body); // Stringify payload
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put(`${reqUrl}/${body['id']}`, bodyString, httpOptions) // ...using put request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  // Delete Reqest
  removeData(AppUrl: string, id: string): Observable<any> {
    let reqUrl: string = this.baseUrl + AppUrl;
    return this.http.delete(`${reqUrl}/${id}`) // ...using put request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}
