import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dataservice } from 'src/app/data-service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit , OnDestroy{



  clearbtn = false
  @ViewChild('content') Elementref;
  
   private subscription: Subscription
  
   mensFilter = [
    { status : false,content:'Full sleeve shirt'},
    { status : false,content: 'Half sleeve shirt'},
    { status : false,content:'shorts'},
    { status : false,content:'Track pants'}]
    womensFilter = [
      { status : false,content:'Full sleeve shirt'},
      { status : false,content:'Legging'},
      { status : false,content:'Long polo sleepwear'},
      { status : false,content: 'Half sleeve shirt'},
      ]
   amountFilter = [
    { status : false,content:'less than 150'},
    { status : false,content:'between 150 to 250'},
    { status : false,content:'between 250 to 350'},
    { status : false,content:'greater than 350'}]
    
    duplicateFilterarray = []
    FilterTypeProd = []
    FilterarrayByType =[]
    SelectedItemByType = []
    selectedItemByPrice = []
    FinalFilterarray = []
    temper = 0
   



  constructor(private modalService: NgbModal,private dataservice: Dataservice) { }
 

  ngOnInit(): void {

    this.subscription = this.dataservice.getheaderStyle().subscribe((value)=>
    {
      console.log("filter subs",value)
      if(value == 'men')
      this.FilterTypeProd = [...this.mensFilter]
      else if(value == 'women')
      this.FilterTypeProd = [...this.womensFilter]
    })
    this.signupform = new FormGroup({
     
      'dropdownone': new FormControl(150,[]),
      'dropdowntwo': new FormControl(650,[]),
      'rangeone': new FormControl(150,[]),
      'rangetwo': new FormControl(650,[])
    })

    this.dataservice.getrequiredProducts().subscribe((value)=>
    {
      this.duplicateFilterarray = value
    })
    
   }

  detailClose()
  {
    this.modalService.dismissAll();
  }
  
  openFilter()
  {
    this.modalService.open(this.Elementref,{ size: 'lg',centered: true });
    this.clearbtn = !this.clearbtn
  }

  filterApply()
  {
  console.log("filterApply--","org arr",this.duplicateFilterarray,"selected item",this.SelectedItemByType)
  this.SelectedItemByType.forEach((item)=>
  {
    this.duplicateFilterarray.forEach((product)=>
    {
       if(product.name.toString().includes(item))
       this.FilterarrayByType.push(product);
    })

  })  
 
  console.log("FilterarrayByType",this.FilterarrayByType)

  if((this.FilterarrayByType.length == 0) && (this.SelectedItemByType.length == 0))
  this.FilterarrayByType = this.duplicateFilterarray

    console.log("FilterarrayByType af  if",this.FilterarrayByType) 

  this.FilterarrayByType.forEach((item)=>
  {
  
    this.temper = +item.estimatedprice.toString().substring(1)
    console.log(this.temper,this.min,this.max)
    if(this.temper >= +this.min && this.temper <= +this.max)
    {
      console.log(this.temper,item,"enter")
      this.FinalFilterarray.push(item)
    }
  })
  console.log("final arr",this.FinalFilterarray);
  this.dataservice.setFilteredDatas(this.FinalFilterarray);
  this.modalService.dismissAll();

  }

  selectedProdByPrice(item)
  {
    item.status = !item.status;

    if(item.status == true)
    this.selectedItemByPrice.push(item.content)
    else
    this.selectedItemByPrice.splice(this.selectedItemByPrice.indexOf(item),1)

    console.log(this.selectedItemByPrice)
  }
    
  selectedProdByType(item)
  {
    item.status = !item.status;

    if(item.status == true)
    this.SelectedItemByType.push(item.content)
    else
    this.SelectedItemByType.splice(this.SelectedItemByType.indexOf(item),1)

    console.log("SelectedItemByType",this.SelectedItemByType)
  }

 

  name: string;
  signupform:FormGroup;
  forbiddenusernames = [ 'thenmozhi','guru'];

  min = 150
  max = 650
  dropdownone = [150,200,250,300,350]
  dropdowntwo = [400,450,500,550,600,650]

  dropdatamax = this.dropdowntwo[5]
  dropdatamin =  this.dropdownone[0]
  rangeone = this.dropdownone[0]
  rangetwo = this.dropdowntwo[5]
  temp = 0
  temp1 = 0

  selectedprice(value)
  {
    
    if(value > 350)
    {
    this.dropdatamax = value
    this.max = value
    this.signupform.controls.rangetwo.setValue(this.dropdatamax);
    }
    else
    {
    this.dropdatamin = value
    this.min = value
    this.signupform.controls.rangeone.setValue(this.dropdatamin);  }
  }
  tempvar = 0
  selectrange(value,str)
  {
    
    this.min = this.signupform.controls.rangeone.value;
    this.max = this.signupform.controls.rangetwo.value;
    console.log(str,this.min,this.max)
   
    if(str == 'min')
    {
    console.log("a")
    if(this.min > this.max)
    {
      this.tempvar = this.min
      this.min = this.max
      this.max = this.tempvar

      this.dropdatamin = this.min
      this.dropdatamax = this.max
      this.signupform.controls.rangeone.setValue(this.dropdatamin);
      this.signupform.controls.rangetwo.setValue(this.dropdatamax);

    }
    else
    this.dropdatamin = this.signupform.controls.rangeone.value;

    }


    else
    {
      
    if(this.max < this.min)
    {
      this.tempvar = this.min
      this.min = this.max
      this.max = this.tempvar

      this.dropdatamin = this.min
      this.dropdatamax = this.max
      this.signupform.controls.rangeone.setValue(this.dropdatamin);
      this.signupform.controls.rangetwo.setValue(this.dropdatamax);
    }
    else 
    this.dropdatamax = this.signupform.controls.rangetwo.value
  

    }
    this.temp = this.signupform.controls.rangeone.value
    this.temp1 =  this.signupform.controls.rangetwo.value
    if(this.signupform.controls.rangeone.value >= 350 || this.signupform.controls.rangetwo.value < 350)
    {
      this.signupform.controls.rangeone.setValue(this.temp1);
      this.signupform.controls.rangetwo.setValue(this.temp);
    }


  }

  onSubmit()
  {
    console.log(this.signupform.value);
  
  }

  clearFilter()
  {
    this.clearbtn = !this.clearbtn;
    this.selectedItemByPrice = []
    this.SelectedItemByType = []
    this.FinalFilterarray = []
    this.FilterarrayByType = []
    this.dropdatamax = this.dropdowntwo[5]
    this.dropdatamin =  this.dropdownone[0]
    this.rangeone = this.dropdownone[0]
    this.rangetwo = this.dropdowntwo[5]
   for(let i=0;i< this.FilterTypeProd.length;i++)
   {
     this.FilterTypeProd[i].status = false
   }
    
    this.dataservice.setclearFilter(true);
  }
  
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    
   }


  }



