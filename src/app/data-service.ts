import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import data from '../assets/data.json';
import { PostsService } from './posts/posts.service';
import { Post } from './posts/post.model';

@Injectable({ providedIn: 'root'}) 
export class Dataservice {
 
   
   headerStyle = new BehaviorSubject<string>('womens');

   sideheaderStyle = new BehaviorSubject<string>('womens');

   FilteredDatas = new BehaviorSubject<object[]>(null);

   clearFilter = new Subject<Boolean>();

   requiredProducts = new BehaviorSubject<object[]>(null);

   subject = new Subject<Boolean>();

   editdata = new BehaviorSubject<Post>(null);

   headeractive = new BehaviorSubject<string>(null);

    datadetail = new Subject<any>();
  
   detailenable = new Subject<Boolean>();

   listenable = new Subject<Boolean>();
   products: any = [];
   orderenable = new Subject<Boolean>();
   size: { menarea: number; womenarea: number;kidarea: number }

   @Output() heightofdiv = new EventEmitter<object>();

  
  constructor(private httpClient: HttpClient,private router: Router,private route: ActivatedRoute,private postservice: PostsService){
    // this.products = data;
  }


  seteditdata(value)
  {
    this.editdata.next(value)
  }

  geteditdata()
  {
    return this.editdata.asObservable();
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
        console.log("entered")
        this.postservice.getPosts().subscribe((value)=>
        {
          this.products = value.data
          console.log("product",this.products)
        
        })
        return   this.products;
        console.log( this.products)
      
      }

      getProduct(index)
      {
       for(let i=0;i<this.products.length;i++)
       {
         if(this.products[i]._id == index)
         return this.products[i]
       }
       
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
     
      return this.headerStyle.asObservable();
    }

    setsideheaderStyle(value)
    {
      
      this.sideheaderStyle.next(value)
    }

    getsideheaderStyle()
    {
      console.log("asobserv")
      return this.sideheaderStyle.asObservable();
    }



    datadetailmethod(value)
    {
      this.datadetail.next(value);
    }
    getdatadetail()
    {
      return this.datadetail.asObservable();
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