import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface Match {
  id: number;
  date: string;
  time?: string;
  competition: string;
  round?: string;
  day?: string;
  venueType?: string;
  venue?: string;
  result?: string | null;
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
  selector: 'app-match-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './match-detail.component.html',
  styleUrl: './match-detail.component.css'
})
export class MatchDetailComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  match: Match | null = null;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    const matchId = this.route.snapshot.paramMap.get('id');
    if (matchId) {
      this.loadMatch(+matchId);
    } else {
      this.error = 'Invalid match ID';
      this.loading = false;
    }
  }

  private loadMatch(id: number) {
    this.loading = true;
    this.error = null;

    this.http.get<Match>(`http://localhost:4000/api/matches/${id}`).subscribe({
      next: (match) => {
        this.match = match;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Unable to load match details.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/matches']);
  }

  isPlayed(): boolean {
    return this.match?.result !== null && this.match?.result !== undefined && this.match?.score !== null;
  }

  isWin(): boolean {
    if (!this.match || !this.isPlayed() || !this.match.score) return false;
    
    const isHome = this.match.venueType === 'Home';
    if (isHome) {
      return this.match.score.home > this.match.score.away;
    } else {
      return this.match.score.away > this.match.score.home;
    }
  }

  isDraw(): boolean {
    return this.match?.result === 'D';
  }

  isLoss(): boolean {
    if (!this.match || !this.isPlayed() || !this.match.score) return false;
    return !this.isWin() && !this.isDraw();
  }

  getChelseaScore(): number | null {
    if (!this.match?.score) return null;
    return this.match.venueType === 'Home' ? this.match.score.home : this.match.score.away;
  }

  getOpponentScore(): number | null {
    if (!this.match?.score) return null;
    return this.match.venueType === 'Home' ? this.match.score.away : this.match.score.home;
  }

  getChelseaTeam(): string {
    return this.match?.venueType === 'Home' ? this.match.homeTeam : this.match?.awayTeam || 'Chelsea';
  }

  getOpponentTeam(): string {
    return this.match?.venueType === 'Home' ? this.match.awayTeam : this.match?.homeTeam || '';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  formatTime(timeString?: string): string {
    if (!timeString) return '';
    // Handle formats like "14:00" or "20:00 (15:00)"
    const time = timeString.split(' ')[0];
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  getResultClass(): string {
    if (!this.isPlayed()) return 'scheduled';
    if (this.isWin()) return 'win';
    if (this.isDraw()) return 'draw';
    if (this.isLoss()) return 'loss';
    return 'scheduled';
  }

  getResultText(): string {
    if (!this.isPlayed()) return 'Scheduled';
    if (this.isWin()) return 'Win';
    if (this.isDraw()) return 'Draw';
    if (this.isLoss()) return 'Loss';
    return 'Scheduled';
  }

  getOppositionPossession(): number | null {
    if (this.match?.possession === undefined || this.match?.possession === null) return null;
    return 100 - this.match.possession;
  }
}

