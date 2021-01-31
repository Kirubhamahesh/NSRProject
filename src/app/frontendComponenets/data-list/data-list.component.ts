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
 
  constructor(private httpClient: HttpClient,private router: Router,private route: ActivatedRoute,private dataservice: Dataservice,private postservice: PostsService){}

  currreq = 'womens'
  requiredProducts: any = [];

  mensarray = []
  womensarray = []
  kidsarray = []

  ngOnInit(){
  
      this.postservice.getPosts().subscribe((value)=>
    {
      this.products = value.data
       console.log("getpost in data lis",this.products)


      for(let i=0;i<this.products.length;i++)
        {
          if(this.products[i].type == 'men')
          this.mensarray.push(this.products[i])
          else if(this.products[i].type == 'women')
          this.womensarray.push(this.products[i])
          else if(this.products[i].type == 'kids')
          this.kidsarray.push(this.products[i])
        }
      this.headsubscription = this.dataservice.getheaderStyle().subscribe((curvalue)=>
        {
          console.log("subscribed in data list",curvalue)
          this.currreq = curvalue;
    
          if(this.currreq == 'men')
          this.requiredProducts = this.mensarray
          else if(this.currreq == 'womens')
          this.requiredProducts = this.womensarray
          else if(this.currreq == 'kid')
          this.requiredProducts = this.kidsarray
          console.log("requiredProducts",this.requiredProducts)
          this.dataservice.setrequiredProducts(this.requiredProducts)
        })
    })

    this.currentActive = 'NSR';
 
      this.dataservice.FilteredDatas.subscribe(value=>
        {
          this.requiredProducts = []
          this.requiredProducts = value;
        })

        this.dataservice.getclearFilter().subscribe((value)=>
        {
          console.log("clear filter subscribed",this.currreq)
          console.log(this.womensarray)
          if(this.currreq == 'men')
          this.requiredProducts = this.mensarray
          else if(this.currreq == 'womens')
          this.requiredProducts = this.womensarray
          else if(this.currreq == 'kid')
          this.requiredProducts = this.kidsarray
          console.log(this.requiredProducts)
          this.dataservice.setrequiredProducts(this.requiredProducts)
        })

      
    


  }
  
  value: { number: number; name: string; }
  onbuymethod(item)
  {
    this.dataservice.subjectmethod(false);
    this.dataservice.detailenablemethod(true);
    this.dataservice.listenablemethod(false);
    this.dataservice.datadetailmethod(item);
    window.scrollTo(0,0);
    
  }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
    // this.headsubscription.unsubscribe();
   }
}
