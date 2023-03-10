import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LeagueService } from 'src/app/services/league.service';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  title: string = "League Standings"
  teams: any[] = [];
  matches: any[] = [];
  apiUrl: string = this.leagueService.apiUrl;

  constructor(
    private leagueService: LeagueService,
    private http: HttpClient
  ) {}


  ngOnInit(): void {
    this.leagueService.getMatches().subscribe((token) => {
      const header = {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${token['access_token']}`
        ),
      };

      this.http
        .get(`${this.apiUrl}/api/v1/getAllMatches`, header)
        .subscribe((league) => {
          this.matches = league['matches'];
          this.leagueService.setMatches(league['matches']);
          this.teams = this.leagueService.getLeaderBoard()
        });
    });
  }
}


