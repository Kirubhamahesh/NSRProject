import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Dataservice } from 'src/app/data-service';


@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private dataservice: Dataservice) { }
  list=[
   
  "Mens",
  "Womens",
  "Kids",
  
  ]
  @Output() selectedDevice= new EventEmitter()
  members=[];
  ngOnInit() {
  this.members=[...this.members,...this.list.slice(0,10)]
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

    // this.router.navigate(['gotoproduct'])
  console.log("onnav",value)

  this.dataservice.setheaderactive(value)
  
  }

  

  }