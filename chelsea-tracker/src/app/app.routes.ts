import { Routes } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { HomeComponent } from './home/home.component';
import { MatchesComponent } from './matches/matches.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'players',
    component: PlayersComponent
  },
  {
    path: 'matches',
    component: MatchesComponent
  }
];
