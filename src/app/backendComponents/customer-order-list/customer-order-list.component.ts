import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/posts/posts.service';

@Component({
  selector: 'app-customer-order-list',
  templateUrl: './customer-order-list.component.html',
  styleUrls: ['./customer-order-list.component.css']
})
export class CustomerOrderListComponent implements OnInit {

  constructor(private postservice: PostsService) { }
  orderDatas = []
  ngOnInit(): void {

   
  this.postservice.getOrderdatas().subscribe((value)=>
  {
    console.log("userdatas",value.data)
    this.orderDatas = value.data
  })

  }

}
