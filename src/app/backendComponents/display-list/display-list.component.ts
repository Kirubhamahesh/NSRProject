import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dataservice } from 'src/app/data-service';
import { PostsService } from 'src/app/posts/posts.service';
import data from 'src/assets/data.json';
@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.css']
})
export class DisplayListComponent implements OnInit {

  products: any = [];
  detail=true;
  list:string;
  private subscription: Subscription;
  private headsubscription: Subscription;

  constructor(private httpClient: HttpClient,private router: Router,private route: ActivatedRoute,private dataservice: Dataservice,private postservice: PostsService){}

  currreq = 'womens'
  requiredProducts: any = [];

  mensarray = []
  womensarray = []
  kidsarray = []

  ngOnInit(){
        this.getdata();
       }
  
  getdata()
  {
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
      this.headsubscription = this.dataservice.getsideheaderStyle().subscribe((curvalue)=>
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
          
        })
    })

  }

  editproduct(obj)
  {
    this.dataservice.seteditdata(obj)
    this.router.navigate(['update'])
  }

  
  deleteItem(id)
  {
   
    this.postservice.deleteProd(id).subscribe((resp)=>
    {
      this.getdata();
     console.log("deleted")  
      })
   
  }


  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
   
   }


}
