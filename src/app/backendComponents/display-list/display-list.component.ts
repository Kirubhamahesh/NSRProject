import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dataservice } from 'src/app/data-service';
import { PostsService } from 'src/app/posts/posts.service';
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

  currentActive = 'Home';
  x:number;
  constructor(private postservice: PostsService,private httpClient: HttpClient,private router: Router,private route: ActivatedRoute,private dataservice: Dataservice){}
  
  currreq = 'women'
  requiredProducts: any = [];

  ngOnInit(){

    this.currentActive = 'NSR';
  //   this.subscription = this.httpClient.get("assets/data.json").subscribe(data =>{
  //   this.products = data;
  // })
      this.products = this.dataservice.getProducts();

    this.postservice.getPosts().subscribe((value)=>
    {
    //  this.requiredProducts = value.data
     console.log("array ",this.requiredProducts)
    })
  

    this.dataservice.getheaderStyle().subscribe((value)=>
    {
     
      this.currreq = value
      console.log("subscri",this.currreq)

      if(this.currreq == 'Womens')
      this.requiredProducts = this.products.dataobj.womens;
      else if(this.currreq == 'Mens')
      this.requiredProducts = this.products.dataobj.mens;
      if(this.currreq == 'Kids')
      this.requiredProducts = this.products.dataobj.kids;

    })
    
    this.requiredProducts = this.products.dataobj.womens;



   
  }
  editproduct(id,type)
  {
   
    this.router.navigate(['update',id,type])
  }

  
  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
   
   }


}
