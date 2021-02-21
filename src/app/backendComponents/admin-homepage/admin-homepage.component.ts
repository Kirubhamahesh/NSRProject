import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Dataservice } from 'src/app/data-service';
import { PostsService } from 'src/app/posts/posts.service';


@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {
  constructor(private httpClient: HttpClient,private router: Router,private route: ActivatedRoute,private dataservice: Dataservice,private postservice: PostsService){}

  list=[
   
  "Mens",
  "Womens",
  "Kids",
  
  ]
  productOrders = []
  userDatas =[]
  @Output() selectedDevice= new EventEmitter()
  members=[];
  ngOnInit() {
  this.members=[...this.members,...this.list.slice(0,10)]


  this.postservice.getOrderdatas().subscribe((value)=>
  {
   
    this.productOrders = value.data
    
  })


  console.log("userdatas  ?????")
  this.postservice.getUsers().subscribe((value)=>
  {
   
    console.log("userdatas",value.data)
    this.userDatas = value.data
    
  })



  }
  onScroll(event){
  const tableViewHeight = event.target.offsetHeight;
  const tableScrollHeight = event.target.scrollHeight;
  const scrollLocation = event.target.scrollTop;
  const buffer = 100;
  const limit = tableScrollHeight - tableViewHeight - buffer;
  if (scrollLocation > limit) {
  this.members=[...this.members,...this.list.slice(this.members.length,this.members.length+5)]
  }
  }
  onNavClick(value){

    this.dataservice.setsideheaderStyle(value)
    this.router.navigate(["prodlist"])
  
  }

  navigateToOrderOrAddItem(value)
  {
    this.router.navigate([value]);
  }

  navigateToCustomerList()
  {
    this.router.navigate(["view-user"]);
  }

  navigateToOrderList()
  {
    this.router.navigate(["view-order"]);
  }



  }