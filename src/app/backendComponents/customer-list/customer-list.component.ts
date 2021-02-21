import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/posts/posts.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private postservice: PostsService) { }
  userDatas = []
  ngOnInit(): void {

   
  this.postservice.getUsers().subscribe((value)=>
  {
    console.log("userdatas",value.data)
    this.userDatas = value.data
  })

  }

}
