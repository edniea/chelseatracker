import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface Player {
  id: number;
  name: string;
  position?: string;
  nation?: string;
  photo?: string;
  stats?: {
    matches?: number;
    goals?: number;
    assists?: number;
    goalsPlusAssists?: number;
    minutes?: number;
  };
}

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit {
  private http = inject(HttpClient);

  players: Player[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadPlayers();
  }

  private loadPlayers() {
    this.loading = true;
    this.error = null;

    this.http.get<Player[]>('http://localhost:4000/api/players').subscribe({
      next: (players) => {
        // Sort by goals + assists (total contribution) descending
        this.players = players
          .filter((p) => p.stats)
          .sort((a, b) => {
            const aTotal = (a.stats?.goals ?? 0) + (a.stats?.assists ?? 0);
            const bTotal = (b.stats?.goals ?? 0) + (b.stats?.assists ?? 0);
            return bTotal - aTotal;
          });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Unable to load players. Is the API running on :4000?';
        console.error(err);
        this.loading = false;
      }
    });
  }
}

