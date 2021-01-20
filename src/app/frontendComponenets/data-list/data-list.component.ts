import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dataservice } from 'src/app/data-service';
import { PostsService } from 'src/app/posts/posts.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit
{
  products: any = [];
  detail=true;
  list:string;
  private subscription: Subscription;
  private headsubscription: Subscription;

  currentActive = 'Home';
  x:number;
  constructor(private httpClient: HttpClient,private router: Router,private route: ActivatedRoute,private dataservice: Dataservice,private postservice: PostsService){}

  currreq = 'women'
  requiredProducts: any = [];

  // updateRequiredProductsByHeader()
  // {
   
  

  // }
  ngOnInit(){


  
    
   this.headsubscription = this.dataservice.getheaderStyle().subscribe((value)=>
    {
      console.log("subscribed in list")
      this.currreq = value;

      if(this.currreq == 'men')
      this.requiredProducts = this.products.dataobj.mens;
      else if(this.currreq == 'women')
      this.requiredProducts = this.products.dataobj.womens;
      else if(this.currreq == 'kid')
      this.requiredProducts = this.products.dataobj.kids;
      console.log("heasubded",this.requiredProducts)
      this.dataservice.setrequiredProducts(this.requiredProducts)
    })
 

    this.currentActive = 'NSR';
    this.subscription = this.httpClient.get("assets/data.json").subscribe(data =>{
    this.products = data;
    
    this.requiredProducts = this.products.dataobj.womens;
    this.dataservice.setrequiredProducts(this.requiredProducts)
   
  })


      this.dataservice.FilteredDatas.subscribe(value=>
        {
          this.requiredProducts = value;
        })

        this.dataservice.getclearFilter().subscribe((value)=>
        {
          console.log("clear filter subscribed",this.currreq)
          if(this.currreq == 'men')
          this.requiredProducts = this.products.dataobj.mens;
          else if(this.currreq == 'women')
          this.requiredProducts = this.products.dataobj.womens;
          else if(this.currreq == 'kid')
          this.requiredProducts = this.products.dataobj.kids;
          console.log(this.requiredProducts)
          this.dataservice.setrequiredProducts(this.requiredProducts)
        })

      
    


  }
  
  value: { number: number; name: string; }
  onbuymethod(number: number,name: string)
  {
   this.value = {number,name};
    console.log("navigate methd")
    // this.detail = false;
    this.dataservice.subjectmethod(false);
    this.dataservice.detailenablemethod(true);
    this.dataservice.listenablemethod(false);
    this.dataservice.datadetailmethod(this.value);
    window.scrollTo(0,0);
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.headsubscription.unsubscribe();
   }
}
