import { Routes } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { HomeComponent } from './home/home.component';
import { MatchesComponent } from './matches/matches.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayerComparisonComponent } from './player-comparison/player-comparison.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';

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
    path: 'players/:id',
    component: PlayerDetailComponent
  },
  {
    path: 'compare',
    component: PlayerComparisonComponent
  },
  {
    path: 'matches',
    component: MatchesComponent
  },
  {
    path: 'matches/:id',
    component: MatchDetailComponent
  }
];
