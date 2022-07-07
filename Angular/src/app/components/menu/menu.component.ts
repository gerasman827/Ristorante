import { Component, Input, OnInit, Inject } from '@angular/core';
import { Dish } from 'src/app/shared/dish';

import { DishService } from '../../services/dish.service';
import { flyInOut, expand } from '../../animations/app.animations';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class MenuComponent implements OnInit {
  
  dishes:Dish[];

  errMess: string;

  // @Input() selectedDish: Dish;

  constructor(private dishService: DishService,
              @Inject('BaseURL') public BaseURL: any) {}

  ngOnInit(): void {
    this.dishService.getDishes()
        .subscribe(dishes => this.dishes = dishes,
          errmess => this.errMess = <any>errmess);
    
  }

  // no es necesario debido a que se trabaja con api-rest
  // onSelected(dish: Dish) {
  //   this.selectedDish = dish;
  // }
}
