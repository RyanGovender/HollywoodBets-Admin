import { Interface } from 'readline';

export interface BetType{
    betTypeId:number;
    betTypeName:string;
}

export interface TournamentBetType{
    tournamentId:number;
    betTypeId:number;
}

export interface TournamentBetTypeVW{
    tournamentBetTypeId:number;
    tournamentName:string;
    betType:string;
}