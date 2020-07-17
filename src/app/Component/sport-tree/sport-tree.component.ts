import { Component, OnInit } from '@angular/core';
import { SportTreeService } from 'src/app/Service/sport-tree.service';
import { SportTree } from 'src/app/Models/SportTree';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sport-tree',
  templateUrl: './sport-tree.component.html',
  styleUrls: ['./sport-tree.component.css']
})
export class SportTreeComponent implements OnInit {

  data:SportTree;
  constructor(private sportTreeSevice:SportTreeService) { }

  sportTree:any;
  sportCountry:any;
  
  SportTree:SportTree;
  showConfirmAlert= false;
  showfailedAlert = false;
  alert = false;
  warningAlert = false;
  messageAlert ='';
  message = '';

  selectSport: SportTree ={
    sportName:'',
    logoUrl:'',
    sportId:0
  };
  ngOnInit(): void {
    this.GetAllSports();
  }

  GetAllSports()
  {
    return this.sportTreeSevice.getAllSports().subscribe((data)=>{
      this.sportTree = data;
    });
  }


  validationCheck(name:string,code:string)
  {
     if(name==="" || code==="")
     {
       return false
     }
     return true;
  }

  AddToSport(name,code)
  {

    if(this.validationCheck(name,code))
    {
      console.log(this.validationCheck(name,code));
      this.close();
      this.SportTree = {
        sportId:0,
        sportName:name,
        logoUrl:code
      };
      this.sportTreeSevice.postToDatabase(this.SportTree).subscribe(
        (value:any)=>{
        if(value!=undefined)
        {
          this.messageAlert = value.status;
          if(value.status.startsWith('S'))
          this.showConfirmAlert = true;
          else
          this.showfailedAlert = true;
        }
        this.GetAllSports();
        }
      );
    }
    else
    {
      this.message = 'Insure all fields are filled.';
    }
    
  }

  DeleteSport(sportId)
  {
     this.sportTreeSevice.deleteSportTreeItem(Number(sportId)).subscribe(
       (value:any)=>
       {
         console.log('',value);
         if(value.status!=null) this.GetAllSports();
         if(value.status !=undefined)
         {
          this.messageAlert = value.status;
           if(value.status.startsWith('D'))
           this.alert = true;
           else
           this.warningAlert = true;
         }
         
         
       }
     );
  }

  UpdateSport(sport:SportTree)
  {
    this.selectSport = sport;
    this.close();
    console.log(this.selectSport.logoUrl);
  }

  UpdateSportInformation(name,code)
  {
    this.selectSport = {
      sportName:name,
      sportId:this.selectSport.sportId,
      logoUrl:code
    };
    if(this.validationCheck(name,code))
    {
    this.sportTreeSevice.updateSportTree(this.selectSport).subscribe((value:any)=>{
      console.log(value);
      if(value.status!=null) this.GetAllSports();
      if(value!=undefined)
      {
        this.messageAlert = value.status;
        if(value.status.includes('Successfully Updated'))
        this.showConfirmAlert = true;
        else
        this.showfailedAlert = true;
      }
      });
    }
   else {
    this.message = 'Insure all fields are filled.';
    }
  }

  close()
  {
    this.showfailedAlert = false;
    this.showConfirmAlert = false;
    this.messageAlert = '';
  }


 

}
