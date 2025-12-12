import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

interface ComparisonStat {
  label: string;
  player1Value: number | string | null;
  player2Value: number | string | null;
  player1Better?: boolean;
  player2Better?: boolean;
  format?: 'number' | 'decimal' | 'percentage';
}

@Component({
  selector: 'app-player-comparison',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './player-comparison.component.html',
  styleUrl: './player-comparison.component.css'
})
export class PlayerComparisonComponent implements OnInit {
  private http = inject(HttpClient);

  players: Player[] = [];
  player1: Player | null = null;
  player2: Player | null = null;
  player1Id: number | null = null;
  player2Id: number | null = null;
  loading = true;
  error: string | null = null;
  comparisonStats: ComparisonStat[] = [];

  ngOnInit(): void {
    this.loadPlayers();
  }

  private loadPlayers() {
    this.loading = true;
    this.error = null;

    this.http.get<Player[]>('http://localhost:4000/api/players').subscribe({
      next: (players) => {
        this.players = players.filter((p) => p.stats).sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Unable to load players. Is the API running on :4000?';
        console.error(err);
        this.loading = false;
      }
    });
  }

  onPlayer1Change() {
    if (this.player1Id) {
      this.player1 = this.players.find(p => p.id === this.player1Id) || null;
      this.updateComparison();
    } else {
      this.player1 = null;
      this.comparisonStats = [];
    }
  }

  onPlayer2Change() {
    if (this.player2Id) {
      this.player2 = this.players.find(p => p.id === this.player2Id) || null;
      this.updateComparison();
    } else {
      this.player2 = null;
      this.comparisonStats = [];
    }
  }

  swapPlayers() {
    const tempId = this.player1Id;
    const tempPlayer = this.player1;
    
    this.player1Id = this.player2Id;
    this.player1 = this.player2;
    
    this.player2Id = tempId;
    this.player2 = tempPlayer;
    
    this.updateComparison();
  }

  private updateComparison() {
    if (!this.player1 || !this.player2 || !this.player1.stats || !this.player2.stats) {
      this.comparisonStats = [];
      return;
    }

    const stats1 = this.player1.stats;
    const stats2 = this.player2.stats;

    this.comparisonStats = [
      // Playing Time
      this.createStat('Matches', stats1.matches, stats2.matches, 'number', true),
      this.createStat('Starts', stats1.starts, stats2.starts, 'number', true),
      this.createStat('Minutes', stats1.minutes, stats2.minutes, 'number', true),
      this.createStat('90s', stats1.nineties, stats2.nineties, 'decimal', true),
      
      // Performance
      this.createStat('Goals', stats1.goals, stats2.goals, 'number', true),
      this.createStat('Assists', stats1.assists, stats2.assists, 'number', true),
      this.createStat('Goals + Assists', stats1.goalsPlusAssists, stats2.goalsPlusAssists, 'number', true),
      this.createStat('Non-Penalty Goals', stats1.nonPenaltyGoals, stats2.nonPenaltyGoals, 'number', true),
      this.createStat('Penalties', stats1.penalties, stats2.penalties, 'number', true),
      
      // Expected Stats
      this.createStat('xG', stats1.xg, stats2.xg, 'decimal', true),
      this.createStat('npxG', stats1.npxg, stats2.npxg, 'decimal', true),
      this.createStat('xAG', stats1.xag, stats2.xag, 'decimal', true),
      this.createStat('npxG + xAG', stats1.npxgPlusXag, stats2.npxgPlusXag, 'decimal', true),
      
      // Progression
      this.createStat('Progressive Carries', stats1.progressiveCarries, stats2.progressiveCarries, 'number', true),
      this.createStat('Progressive Passes', stats1.progressivePasses, stats2.progressivePasses, 'number', true),
      this.createStat('Progressive Runs', stats1.progressiveRuns, stats2.progressiveRuns, 'number', true),
      
      // Discipline (lower is better)
      this.createStat('Yellow Cards', stats1.yellowCards, stats2.yellowCards, 'number', false),
      this.createStat('Red Cards', stats1.redCards, stats2.redCards, 'number', false),
      
      // Per 90 Stats
      this.createStat('Goals/90', stats1.per90?.goals, stats2.per90?.goals, 'decimal', true),
      this.createStat('Assists/90', stats1.per90?.assists, stats2.per90?.assists, 'decimal', true),
      this.createStat('G+A/90', stats1.per90?.goalsPlusAssists, stats2.per90?.goalsPlusAssists, 'decimal', true),
      this.createStat('xG/90', stats1.per90?.xg, stats2.per90?.xg, 'decimal', true),
      this.createStat('xAG/90', stats1.per90?.xag, stats2.per90?.xag, 'decimal', true),
      this.createStat('xG+xAG/90', stats1.per90?.xgPlusXag, stats2.per90?.xgPlusXag, 'decimal', true),
      this.createStat('npxG/90', stats1.per90?.npxg, stats2.per90?.npxg, 'decimal', true),
      this.createStat('npxG+xAG/90', stats1.per90?.npxgPlusXag, stats2.per90?.npxgPlusXag, 'decimal', true),
    ].filter(stat => stat.player1Value !== null || stat.player2Value !== null);
  }

  private createStat(
    label: string,
    value1: number | undefined | null,
    value2: number | undefined | null,
    format: 'number' | 'decimal' | 'percentage' = 'number',
    higherIsBetter: boolean = true
  ): ComparisonStat {
    const val1 = value1 ?? null;
    const val2 = value2 ?? null;

    let formatted1: number | string | null = val1;
    let formatted2: number | string | null = val2;

    if (val1 !== null) {
      if (format === 'decimal') {
        formatted1 = val1.toFixed(2);
      } else if (format === 'number') {
        formatted1 = val1.toLocaleString();
      }
    }

    if (val2 !== null) {
      if (format === 'decimal') {
        formatted2 = val2.toFixed(2);
      } else if (format === 'number') {
        formatted2 = val2.toLocaleString();
      }
    }

    let player1Better = false;
    let player2Better = false;

    if (val1 !== null && val2 !== null) {
      if (higherIsBetter) {
        player1Better = val1 > val2;
        player2Better = val2 > val1;
      } else {
        player1Better = val1 < val2;
        player2Better = val2 < val1;
      }
    }

    return {
      label,
      player1Value: formatted1,
      player2Value: formatted2,
      player1Better,
      player2Better,
      format
    };
  }
}

