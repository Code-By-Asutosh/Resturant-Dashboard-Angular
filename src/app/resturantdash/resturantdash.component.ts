import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ResturantData } from '../shared/resturant.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-resturantdash',
  templateUrl: './resturantdash.component.html',
  styleUrls: ['./resturantdash.component.css']
})
export class ResturantdashComponent implements OnInit {
  formValue!: FormGroup
  resturantModelObj: ResturantData = new ResturantData;
  allResturantData: any;
  showAdd!:boolean
  showbtn!:boolean
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData()
  }
  clickAddResto()
  {
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
  //NOW SUBSCRIBE OUR DATA WHICH IS MAPPED VIA SERVICES
  addResto() {
    this.resturantModelObj.name = this.formValue.value.name;
    this.resturantModelObj.email = this.formValue.value.email;
    this.resturantModelObj.mobile = this.formValue.value.mobile;
    this.resturantModelObj.address = this.formValue.value.address;
    this.resturantModelObj.services = this.formValue.value.services;

    this.api.postResturant(this.resturantModelObj).subscribe(res => {
      console.log(res);
      alert("Resturant record added successfully");
      this.formValue.reset() //form value reset for get new data from user
      this.getAllData(); //for didnt refresh
    },
      err => {
        alert("Facing Some Error");
      })
  }
  //GET ALL DATA
  getAllData() {
    this.api.getResturant().subscribe(res => {
      this.allResturantData = res;
    })
  }
  //DELETE DATA
  deleteResto(data: any) {
    this.api.deleteResturant(data.id).subscribe(res => {
      this.getAllData();//instant refresh data
      alert("record deleted successfully");
    })
  }
  //EDIT DATA
  onEditResto(data:any)
  {
    this.showAdd=false;
    this.showbtn=true;
    this.resturantModelObj.id=data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  //UPDATE DATA
  updateResto()
  {
    this.resturantModelObj.name = this.formValue.value.name;
    this.resturantModelObj.email = this.formValue.value.email;
    this.resturantModelObj.mobile = this.formValue.value.mobile;
    this.resturantModelObj.address = this.formValue.value.address;
    this.resturantModelObj.services = this.formValue.value.services;

    this.api.updateResturant(this.resturantModelObj,this.resturantModelObj.id).subscribe(res=>{
      alert("records updated successfully");
      this.formValue.reset()
      this.getAllData();
    })
  }
}
