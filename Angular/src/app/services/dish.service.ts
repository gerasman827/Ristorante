import { Injectable } from '@angular/core';
import  { DISHES } from '../shared/dishes';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Dish } from '../shared/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
    // // return Promise.resolve(DISHES);
    // return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES), 2000);
    // });

    // utilizando obervables... 
    return of(DISHES).pipe(delay(2000))
  }

  getDish(id: string): Observable<Dish>{
    // // return Promise.resolve(DISHES.filter((dish) => 
    // // (dish.id === id) )[0]);
    // return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    // });

    // utilizando observables  ...
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish>{
      // // return Promise.resolve(DISHES.filter((dish) =>
      // // dish.featured)[0]);
      // return  new Promise(resolve=> {
      //   // Simulate server latency with 2 second delay
      //     setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
      // });


      // utilizando observables ...
      return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id ));
  }
}
