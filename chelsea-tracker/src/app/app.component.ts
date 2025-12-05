import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);

  title = 'Chelsea Tracker';
  loading = true;
  error: string | null = null;

  goalsLeader?: Player;
  assistsLeader?: Player;

  ngOnInit(): void {
    this.loadLeaders();
  }

  private loadLeaders() {
    this.loading = true;
    this.error = null;

    this.http.get<Player[]>('http://localhost:4000/api/players').subscribe({
      next: (players) => {
        const withStats = players.filter((p) => !!p.stats);
        this.goalsLeader = this.getLeader(withStats, 'goals');
        this.assistsLeader = this.getLeader(withStats, 'assists');
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Unable to load leaders. Is the API running on :4000?';
        console.error(err);
        this.loading = false;
      },
    });
  }

  private getLeader(players: Player[], field: 'goals' | 'assists'): Player | undefined {
    return [...players].sort((a, b) => (b.stats?.[field] ?? 0) - (a.stats?.[field] ?? 0))[0];
  }
}

interface Player {
  id: number;
  name: string;
  position?: string;
  nation?: string;
  stats?: {
    goals?: number;
    assists?: number;
    goalsPlusAssists?: number;
    minutes?: number;
  };
}
