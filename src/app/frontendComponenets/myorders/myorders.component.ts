import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dataservice } from 'src/app/data-service';
import { PostsService } from 'src/app/posts/posts.service';


@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  productOrders: any = [];
  constructor(private httpClient: HttpClient,private router: Router,private route: ActivatedRoute,private dataservice: Dataservice,private postservice: PostsService){}
  isloading = true

  ngOnInit(): void {
    window.scrollTo(0,0)

    console.log("order comp")
    this.postservice.getOrderdatas().subscribe((value)=>
    {
      this.isloading = false
      this.productOrders = value.data
       console.log("getorder in  lis",this.productOrders)
    })

    window.scrollTo(0,0)

  }


  getPostsData()
  {
    this.isloading = true
    this.postservice.getOrderdatas().subscribe((value)=>
    {
      this.isloading = false
      this.productOrders = value.data
      window.scrollTo(0,0)
       console.log("getorder in  lis",this.productOrders)
    })

  }

  deleteItem(id)
  {
    this.isloading = true
    this.postservice.deletePost(id).subscribe((resp)=>
    { 
      this.getPostsData();
    })
   
  }

}
