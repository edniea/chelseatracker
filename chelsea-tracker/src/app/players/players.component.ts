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
  minGoals: number | null = null;
  minAssists: number | null = null;
  minMinutes: number | null = null;

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
    const query = this.searchQuery.toLowerCase().trim();
    const hasSearchQuery = query.length > 0;
    const hasStatFilters = this.minGoals !== null || this.minAssists !== null || this.minMinutes !== null;

    // If no filters applied, show all players
    if (!hasSearchQuery && !hasStatFilters) {
      this.filteredPlayers = [...this.players];
      return;
    }

    this.filteredPlayers = this.players.filter(player => {
      // Text search filter
      if (hasSearchQuery) {
        const name = player.name.toLowerCase();
        const position = player.position?.toLowerCase() || '';
        const nation = player.nation?.toLowerCase() || '';

        const matchesSearch = name.includes(query) ||
                              position.includes(query) ||
                              nation.includes(query);
        
        if (!matchesSearch) return false;
      }

      // Stat filters
      const goals = player.stats?.goals ?? 0;
      const assists = player.stats?.assists ?? 0;
      const minutes = player.stats?.minutes ?? 0;

      if (this.minGoals !== null && goals < this.minGoals) return false;
      if (this.minAssists !== null && assists < this.minAssists) return false;
      if (this.minMinutes !== null && minutes < this.minMinutes) return false;

      return true;
    });
  }

  onGoalsFilterChange(value: string): void {
    this.minGoals = value === '' ? null : parseInt(value, 10);
    if (isNaN(this.minGoals!)) this.minGoals = null;
    this.filterPlayers();
  }

  onAssistsFilterChange(value: string): void {
    this.minAssists = value === '' ? null : parseInt(value, 10);
    if (isNaN(this.minAssists!)) this.minAssists = null;
    this.filterPlayers();
  }

  onMinutesFilterChange(value: string): void {
    this.minMinutes = value === '' ? null : parseInt(value, 10);
    if (isNaN(this.minMinutes!)) this.minMinutes = null;
    this.filterPlayers();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterPlayers();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.minGoals = null;
    this.minAssists = null;
    this.minMinutes = null;
    this.filterPlayers();
  }

  hasActiveFilters(): boolean {
    return !!this.searchQuery || 
           this.minGoals !== null || 
           this.minAssists !== null || 
           this.minMinutes !== null;
  }
}

