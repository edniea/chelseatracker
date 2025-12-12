import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit {
  private http = inject(HttpClient);

  players: Player[] = [];
  filteredPlayers: Player[] = [];
  loading = true;
  error: string | null = null;
  searchQuery: string = '';

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
        this.filteredPlayers = [...this.players];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Unable to load players. Is the API running on :4000?';
        console.error(err);
        this.loading = false;
      }
    });
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.filterPlayers();
  }

  filterPlayers(): void {
    if (!this.searchQuery.trim()) {
      this.filteredPlayers = [...this.players];
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.filteredPlayers = this.players.filter(player => {
      const name = player.name.toLowerCase();
      const position = player.position?.toLowerCase() || '';
      const nation = player.nation?.toLowerCase() || '';

      return name.includes(query) ||
             position.includes(query) ||
             nation.includes(query);
    });
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterPlayers();
  }
}

