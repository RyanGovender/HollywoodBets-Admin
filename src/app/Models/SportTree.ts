export class SportTree{
    sportId:number;
    sportName:string;
    logoUrl:string;
}

export class SportCountry{
    sportId:number;
    countryId:number;
}

export interface SportCountryViewModel
{
    sportCountryId:number;
    countryName:string;
    sportName:string;
    sportId:number;
    countryId:number;
}

export class SportCountryModel{
    sportCountryId:number;
    sportId:number;
    countryId:number;
}