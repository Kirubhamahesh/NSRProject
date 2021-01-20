import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import data from '../assets/data.json';

@Injectable({ providedIn: 'root'}) 
export class Dataservice {
 
   
   headerStyle = new BehaviorSubject<string>(null);

   FilteredDatas = new Subject<object[]>();

   clearFilter = new Subject<Boolean>();

   requiredProducts = new Subject<object[]>();

   subject = new Subject<Boolean>();

   headeractive = new BehaviorSubject<string>(null);

   datadetail = new Subject<{number: number,name: string}>();
  
   detailenable = new Subject<Boolean>();

   listenable = new Subject<Boolean>();
   products: any = [];
   orderenable = new Subject<Boolean>();
   size: { menarea: number; womenarea: number;kidarea: number }

   @Output() heightofdiv = new EventEmitter<object>();

  
  constructor(private httpClient: HttpClient,private router: Router,private route: ActivatedRoute){
    this.products = data;
  }

  ngOnInit(){
   
    // this.httpClient.get("assets/data.json").subscribe(data =>{
    //   this.products = data;
    // })

      }

      
      setheaderactive(value)
      {
        console.log("headed")
        this.headeractive.next(value)
      }
  
      getheaderactive()
      {
        return this.headeractive.asObservable();
      }

      getProducts()
      {
        console.log("get",this.products)
        return this.products
       
      }
      
      setclearFilter(value)
      {
        this.clearFilter.next(value)
      }
  
      getclearFilter()
      {
        return this.clearFilter.asObservable();
      }
  
      setFilteredDatas(value)
      {
        this.FilteredDatas.next(value)
      }
  
      getFilteredDatas()
      {
        return this.FilteredDatas.asObservable();
      }
  

    setrequiredProducts(value)
    {
      this.requiredProducts.next(value)
    }

    getrequiredProducts()
    {
      return this.requiredProducts.asObservable();
    }

    setheaderStyle(value)
    {
      console.log("setted ")
      this.headerStyle.next(value)
    }

    getheaderStyle()
    {
      console.log("asobserv")
      return this.headerStyle.asObservable();
    }


    datadetailmethod(value: {number: number,name: string})
    {
      this.datadetail.next(value);
    }
    detailenablemethod(value: Boolean)
    {
      this.detailenable.next(value);
    }
    listenablemethod(value: Boolean)
    {
      this.listenable.next(value);
    }

    ordermethod(value: Boolean)
    {
      this.orderenable.next(value);
    }
    
    subjectmethod(value: Boolean)
    {
      this.subject.next(value);
    }

    heightofdivmethod(value: object)
    {
      this.heightofdiv.next(value);
    }

     

  
}