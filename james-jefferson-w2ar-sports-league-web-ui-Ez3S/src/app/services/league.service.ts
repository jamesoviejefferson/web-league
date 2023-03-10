/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Match } from '../Matches';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  constructor(private http: HttpClient) {}
  matches: any[];

  apiUrl: string = 'http://127.0.0.1:3001';

  /**
   * Sets the match schedu''
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */

  setMatches(matches: any[]) {
    this.matches = matches;
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/api/v1/getAccessToken`);
  }

  /**
   * Returns the leaderBoard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderBoard.
   */
  getLeaderBoard(): any[] {
    
    
interface Team {
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

const teams: Team[] = [
  { name: "Serbia", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  { name: "Cameroon", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  { name: "Switzerland", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  { name: "Brazil", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
];

function updateTable(homeTeam: Team, homeGoals: number, awayTeam: Team, awayGoals: number) {
  homeTeam.played += 1;
  homeTeam.goalsFor += homeGoals;
  homeTeam.goalsAgainst += awayGoals;
  awayTeam.played += 1;
  awayTeam.goalsFor += awayGoals;
  awayTeam.goalsAgainst += homeGoals;

  if (homeGoals > awayGoals) {
    homeTeam.won += 1;
    homeTeam.points += 3;
    awayTeam.lost += 1;
  } else if (awayGoals > homeGoals) {
    awayTeam.won += 1;
    awayTeam.points += 3;
    homeTeam.lost += 1;
  } else {
    homeTeam.drawn += 1;
    homeTeam.points += 1;
    awayTeam.drawn += 1;
    awayTeam.points += 1;
  }

  homeTeam.goalDifference = homeTeam.goalsFor - homeTeam.goalsAgainst;
  awayTeam.goalDifference = awayTeam.goalsFor - awayTeam.goalsAgainst;
    }
    

    
    this.matches.forEach(match => {
      
      let awayTeam = teams.find(team => team.name === match.awayTeam)
      let homeTeam = teams.find(team => team.name === match.homeTeam)

      updateTable(homeTeam, match.homeTeamScore, awayTeam, match.awayTeamScore); 
      
    })


// Sort teams by points, then goal difference, then goals for
teams.sort((a, b) => {
  if (a.points > b.points) {
    return -1;
  } else if (a.points < b.points) {
    return 1;
  } else {
    if (a.goalDifference > b.goalDifference) { 
      return 1
    }
  }
})
    
  return teams

  }

  /**
   * Asynchronic function to fetch the data from the server.
   */
  async fetchData() {}
}
