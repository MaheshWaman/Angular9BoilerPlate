import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private _router:Router) {

   }
   intercept(request: HttpRequest<any> , next: HttpHandler): Observable<HttpEvent<any>>{
    console.log(request.url);
    // return next.handle(request);
    const localToken = localStorage.getItem('token');
      console.log("localToekn",localToken);
    if(localToken){

      let ignore =
        // typeof request.body === "undefined"
        // || request.body === null
        // || request.headers.has("Content-Type");
        request.body != null ? (request.body.toString() === "[object FormData]") :false // <-- This solves your problem
        if (ignore) {
          return next.handle(request);
      }
      else{
        request = request.clone({
          headers:new HttpHeaders({
            "Content-Type": "application/json; charset=utf-8",
  'Authorization': 'Bearer '+ localStorage.getItem('token')
          })
        });
      }
          
        
    }
    console.log("request ::",request);
    return next.handle(request).pipe(
      catchError( error=> {
         
        // Checking if it is an Authentication Error (401)
        if (error.status === 401) {
          // alert('Access Denied');
          // <Log the user out of your application code>
          this._router.navigate([ 'login' ]);
          return throwError(error);
        }
        // If it is not an authentication error, just throw it
        return throwError(error);
      })
    );
  }
}
