import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LeagueService } from 'src/app/services/league.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  constructor(private leagueService: LeagueService, private http: HttpClient) {}
  title: string = 'League Schedule';
  matches: any[] = [];
  apiUrl: string = this.leagueService.apiUrl;

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
          league['matches'].map((match: { [x: string]: number }) => {
            let covertedTime: any = this.formatMilliseconds(match['matchDate']);
            match['matchDate'] = covertedTime;
          });

          this.matches = league['matches'];
          this.leagueService.setMatches(league['matches']);
        });
    });
  }
  formatMilliseconds(ms: number): string {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Add leading zeros to day, month, hours, and minutes if necessary
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}`;
  }
}
