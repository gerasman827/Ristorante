import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from 'src/app/services/dish.service';
import { LeadersService } from 'src/app/services/leaders.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { Dish } from 'src/app/shared/dish';
import { Leader } from 'src/app/shared/leader';
import { Promotion } from 'src/app/shared/promotion';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leaderFeatured: Leader;


  constructor(private dishservice: DishService,
              private promotionservice: PromotionService,
              private leaderService: LeadersService,
              @Inject('BaseURL') public BaseURL: any) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe(d => this.dish = d);
    
    this.promotionservice.getFeaturedPromotion()
    .then(promotion => this.promotion = promotion);

    this.leaderService.getFeaturedLeader()
    .then(leader => this.leaderFeatured = leader);
  }

}
