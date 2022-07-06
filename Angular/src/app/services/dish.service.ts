import { Injectable } from '@angular/core';
// import  { DISHES } from '../shared/dishes';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Dish } from '../shared/dish';

import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';



@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    // // return Promise.resolve(DISHES);
    // return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES), 2000);
    // });

    // utilizando obervables... 
    // return of(DISHES).pipe(delay(2000))

    //api rest
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: string): Observable<Dish>{
    // // return Promise.resolve(DISHES.filter((dish) => 
    // // (dish.id === id) )[0]);
    // return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    // });

    // // utilizando observables  ...
    // return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));

    // api rest
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish>{
      // // return Promise.resolve(DISHES.filter((dish) =>
      // // dish.featured)[0]);
      // return  new Promise(resolve=> {
      //   // Simulate server latency with 2 second delay
      //     setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
      // });


      // utilizando observables ...
      // return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));

      return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    // return of(DISHES.map(dish => dish.id ));

    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
