import { Component, OnInit } from '@angular/core';
import { BetType } from 'src/app/Models/BetType';
import { BettypeService } from 'src/app/Service/bettype.service';

@Component({
  selector: 'app-bettype',
  templateUrl: './bettype.component.html',
  styleUrls: ['./bettype.component.css']
})
export class BettypeComponent implements OnInit {

  countries:any;
  country:BetType;
  showConfirmAlert= false;
  showfailedAlert = false;
  alert = false;
  warningAlert = false;
  messageAlert ='';
  message = '';
  selectedBetType: BetType ={
    betTypeId:0,
    betTypeName:''
  };

  constructor(private betType:BettypeService) { }

  ngOnInit(): void {
    this.GetAllBetTypes();
  }

  GetAllBetTypes()
  {
    return this.betType.GetAllTournament().subscribe((data)=>{
      this.countries = data;
    });
  }

  validationCheck(name:string)
  {
     if(name==="")
     {
       return false
     }
     return true;
  }

  AddBetType(name)
  {
    this.close();
    this.country = {
      betTypeId:0,
      betTypeName:name
    };

    if(this.validationCheck(name))
    {
      this.betType.PostTournament(this.country).subscribe(
        (value:any)=>{
          if(value!=undefined)
          {
            this.messageAlert = value.status;
            if(value.status.startsWith('S'))
            this.showConfirmAlert = true;
            else
            this.showfailedAlert = true;
          }
        this.GetAllBetTypes();
        }
      );
      this.message ='';
    }
    else
    {
      this.message = 'All fields must be filled.'
    }
   
  }

  DeleteBetType(countryId)
  {
     this.betType.DeleteTournament(Number(countryId)).subscribe(
       (value:any)=>
       {
         console.log('',value);
         if(value.status!=null) this.GetAllBetTypes();
         if(value!=undefined)
         {
          this.messageAlert = value.status;
          if(value.status.startsWith('I'))
          this.alert = true;
          else
          this.warningAlert = true;
         }
         else
         {
           this.warningAlert = true;
         }
       }
     );
  }
  UpdateBetType(Country:BetType)
  {
    this.selectedBetType = Country;
    this.close();
    console.log(this.selectedBetType);
  }

  UpdateBetTypeInformation(name)
  {
    this.selectedBetType = {
      betTypeName:name,
      betTypeId:this.selectedBetType.betTypeId
    }
    if(this.validationCheck(name))
    {
    this.betType.UpdateTournamentDetails(this.selectedBetType).subscribe((value:any)=>{
      console.log(value);
      if(value.status!=null) this.GetAllBetTypes();
      if(value!=undefined )
      {
        this.messageAlert = value.status;
        if(value.status.includes('Successfully Updated'))
        this.showConfirmAlert = true;
        else
        this.showfailedAlert = true;
      }
      })
      this.message ='';
    }
    else
    {
      this.message = 'All fields must be filled.'
    }
  }

  close()
  {
    this.showfailedAlert = false;
    this.showConfirmAlert = false;
    this.messageAlert = '';
  }

}
