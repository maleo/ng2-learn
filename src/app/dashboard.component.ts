import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { routerTransition } from './router.animations';

@Component({
  	selector: 'my-dashboard',
  	templateUrl: './app/dashboard.component.html',
  	styleUrls: ['./app/dashboard.component.css'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class DashboardComponent implements OnInit{
    heroes: Hero[] = [];

    constructor(private heroService: HeroService) { }

    ngOnInit(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));
    }
}