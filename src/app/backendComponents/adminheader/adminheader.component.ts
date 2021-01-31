import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dataservice } from 'src/app/data-service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {
  constructor(private route: ActivatedRoute,private dataservice: Dataservice,private router: Router) { }
  animation = false;
  
  toggle=false
 
  gotohome()
  {
    this.dataservice.setheaderStyle('womens');
    window.scrollTo(0,0);
    this.router.navigate(['gotoproduct'])
  }


  ngOnInit(): void {
  }



showMenu(){
    this.toggle=!this.toggle
}
  
  
}

