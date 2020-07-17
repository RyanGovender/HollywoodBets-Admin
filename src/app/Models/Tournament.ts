export interface Tournament{
    tournamentId:number;
    tournamentName:string;
}

export interface SportTournamentCountry{
    tournamentId:number;
    sportId:number;
    countryId:number;
}

export interface SportCountryTournamentVW{
    sportTournamentId:number;
    tournamentName:string;
    sportName:string;
    countryName:string;
}