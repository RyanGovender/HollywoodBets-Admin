import { Component, OnInit } from '@angular/core';
import { SportTreeService } from 'src/app/Service/sport-tree.service';
import { CountryService } from 'src/app/Service/country.service';
import { AnyARecord } from 'dns';
import { SportTree, SportCountry, SportCountryViewModel, SportCountryModel } from 'src/app/Models/SportTree';
import { Country } from 'src/app/Models/Country';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-sportcountry',
  templateUrl: './sportcountry.component.html',
  styleUrls: ['./sportcountry.component.css']
})
export class SportcountryComponent implements OnInit {

  constructor(private _sportService:SportTreeService,private _countryService:CountryService) { }

  
  sports:any;
  countries:any;
  sportCountry:any;
  sportItemOne:SportTree;
  countryItem:Country;
  selectedSport:SportTree;
  selectedCountry:Country;
  createObject:SportCountry;
  messageAlert = false;
  message = '';
  editObject:SportCountryViewModel;
  editDrop1:any;
  editDrop2:any;
  editSport:SportTree;
  editCountry:Country;
  updateObject:SportCountryModel;
  showConfirmAlert= false;
  showfailedAlert = false;

  ngOnInit(): void {
    this.GetAllCountries();
    this.GetAllSports();
    this.GetAllSportCountry();
  }

  GetAllSports()
  {
    return this._sportService.getAllSports().subscribe(
    (value:any)=>
    {
      this.sports = value;
      this.sportItemOne = value[0].sportName;
      this.selectedSport = value[0];
    }
    );
  }

  GetAllCountries()
  {
    return this._countryService.GetAllCountries().subscribe(
      (value:any)=>{
      this.countries = value;
      this.countryItem = value[0].countryName;
      this.selectedCountry = value[0];
      }
    );
  }

  GetAllSportCountry()
  {
    return this._sportService.GetAllSportCountry().subscribe(
      (data:any)=>{
        this.sportCountry = data;
      }
    )
  }

  SelectSport(sport)
  {
    this.selectedSport = sport;
    this.sportItemOne = sport.sportName;
  }

  SelectCountry(country)
  {
    this.selectedCountry = country;
    this.countryItem = country.countryName;
  }

  PostMappObjectsToDb()
  {
     this.createObject = {
       sportId:this.selectedSport.sportId,
       countryId:this.selectedCountry.countryId
     }
     this._sportService.PostToSportCountry(this.createObject).subscribe(
       (value:any)=>{
        this.messageAlert = true;
         if(value!=undefined)
         {
            this.GetAllSportCountry();
            this.message = value.status;
         }
         else
         {
           this.message = 'Mapping objects has failed.';
         }
       }
     );
  }

  GetEditValue(sportCounty)
  {
    this.editObject = sportCounty;
    const sportFilter =  this.sports.filter((x:SportTree)=>x.sportId == this.editObject.sportId)[0];
    const countryFilter = this.countries.filter(x=>x.countryId == this.editObject.countryId)[0]
    this.editDrop1 = sportFilter.sportName;
    this.editDrop2 = countryFilter.countryName;
    this.editSport = sportFilter;
    this.editCountry = countryFilter;
  }

  click()
  {
    console.log(this.editDrop1.sportName);
    console.log(this.editDrop2.countryName);
    console.log(this.editObject);
  }

  selectEditSport(sport)
  {
    this.editSport = sport;
    this.editDrop1 = this.editSport.sportName;
  }

  selectEditCountry(country)
  {
    this.editCountry = country;
    this.editDrop2 = this.editCountry.countryName;
  }

  UpdateSportCountry()
  {
    console.log('',this.editObject)
     this.updateObject ={
       sportCountryId:this.editObject.sportCountryId,
       countryId:this.editCountry.countryId,
       sportId:this.editSport.sportId
     }

     this._sportService.UpdateSportCountry(this.updateObject).subscribe(
       (value:any)=>{
         console.log(value);
         if(value!=undefined) this.GetAllSportCountry();
         if(value!=undefined )
      {
        this.messageAlert = value.status;
        if(value.status.includes('Successfully Updated'))
        this.showConfirmAlert = true;
        else
        this.showfailedAlert = true;
      }
       }
     )
  }

  close()
  {
    this.messageAlert = false;
    this.showConfirmAlert = false;
    this.showfailedAlert = false;
  }

}
