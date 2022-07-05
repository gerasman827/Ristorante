import { Component, OnInit } from '@angular/core';
import { LeadersService } from 'src/app/services/leaders.service';
import { Leader } from 'src/app/shared/leader';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  constructor(private leaderService: LeadersService) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
    .then(leader => this.leaders = leader);  
  }

}
