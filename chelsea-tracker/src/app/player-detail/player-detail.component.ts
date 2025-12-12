import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface PlayerStats {
  matches?: number;
  starts?: number;
  minutes?: number;
  nineties?: number;
  goals?: number;
  assists?: number;
  goalsPlusAssists?: number;
  nonPenaltyGoals?: number;
  penalties?: number;
  penaltiesAttempted?: number;
  yellowCards?: number;
  redCards?: number;
  xg?: number;
  npxg?: number;
  xag?: number;
  npxgPlusXag?: number;
  progressiveCarries?: number;
  progressivePasses?: number;
  progressiveRuns?: number;
  per90?: {
    goals?: number;
    assists?: number;
    goalsPlusAssists?: number;
    nonPenaltyGoals?: number;
    xg?: number;
    xag?: number;
    xgPlusXag?: number;
    npxg?: number;
    npxgPlusXag?: number;
  };
}

interface Player {
  id: number;
  name: string;
  position?: string;
  nation?: string;
  age?: string;
  photo?: string;
  stats?: PlayerStats;
}

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css'
})
export class PlayerDetailComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  player: Player | null = null;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    const playerId = this.route.snapshot.paramMap.get('id');
    if (playerId) {
      this.loadPlayer(+playerId);
    } else {
      this.error = 'Invalid player ID';
      this.loading = false;
    }
  }

  private loadPlayer(id: number) {
    this.loading = true;
    this.error = null;

    this.http.get<Player>(`http://localhost:4000/api/players/${id}`).subscribe({
      next: (player) => {
        this.player = player;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Unable to load player details.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/players']);
  }
}

