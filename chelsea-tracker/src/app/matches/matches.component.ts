import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface Match {
  id: number;
  date: string;
  time?: string;
  competition: string;
  round?: string;
  day?: string;
  venueType?: string;
  result?: string | null; // "W", "L", "D", or null
  score?: {
    home: number;
    away: number;
  } | null;
  homeTeam: string;
  awayTeam: string;
  xg?: number;
  xga?: number;
  possession?: number;
  attendance?: number;
  captain?: string;
  formation?: string;
  oppositionFormation?: string;
  referee?: string;
  notes?: string;
}

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent implements OnInit {
  private http = inject(HttpClient);

  matches: Match[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadMatches();
  }

  private loadMatches() {
    this.loading = true;
    this.error = null;

    this.http.get<Match[]>('http://localhost:4000/api/matches').subscribe({
      next: (matches) => {
        // Sort by date (most recent first)
        this.matches = matches.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Unable to load matches. Is the API running on :4000?';
        console.error(err);
        this.loading = false;
      }
    });
  }

  isPlayed(match: Match): boolean {
    return match.result !== null && match.result !== undefined && match.score !== null;
  }

  isWin(match: Match): boolean {
    if (!this.isPlayed(match) || !match.score) return false;
    
    const isHome = match.venueType === 'Home';
    if (isHome) {
      return match.score.home > match.score.away;
    } else {
      return match.score.away > match.score.home;
    }
  }

  isDraw(match: Match): boolean {
    return match.result === 'D';
  }

  isLoss(match: Match): boolean {
    if (!this.isPlayed(match) || !match.score) return false;
    return !this.isWin(match) && !this.isDraw(match);
  }

  getChelseaScore(match: Match): number | null {
    if (!match.score) return null;
    return match.venueType === 'Home' ? match.score.home : match.score.away;
  }

  getOpponentScore(match: Match): number | null {
    if (!match.score) return null;
    return match.venueType === 'Home' ? match.score.away : match.score.home;
  }

  getOpponent(match: Match): string {
    return match.venueType === 'Home' ? match.awayTeam : match.homeTeam;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }
}

