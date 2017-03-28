import { Component } from '@angular/core';
import { Router }   from '@angular/router';
import { HeroService } from './hero.service';

import { Hero } from './hero';

import { routerTransition } from './router.animations';

@Component({
    selector: 'my-heroes',
    templateUrl:'./app/heroes.component.html',
    styleUrls: ['./app/heroes.component.css'],
    providers: [HeroService],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class HeroesComponent {
    heroes: Hero[];
    title = 'Tour of Heroes'; 
    selectedHero: Hero;
    constructor(private router: Router,private heroService: HeroService) { }
    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }
    ngOnInit(): void {
        this.getHeroes();
    }
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name).then(hero => {
            this.heroes.push(hero);
            this.selectedHero = null;
        });
    }
    
    delete(hero: Hero): void {
        this.heroService.delete(hero.id).then(() => {this.heroes = this.heroes.filter(h => h !== hero);if (this.selectedHero === hero) { this.selectedHero = null; }
        });
    }
}
