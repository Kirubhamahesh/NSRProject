import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dataservice } from 'src/app/data-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute,private dataservice: Dataservice,private router: Router) { }
  animation = false;
  activelink:string;
  topofmenarea = 0;
  topofwomenarea = 0;
  topofkidarea = 0;
  toggle=false
 
  

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
  console.log(document.documentElement.scrollTop);
if(document.documentElement.scrollTop >=75 && document.documentElement.scrollTop <=95 ) {
  this.animation=!this.animation
  console.log("animat",this.animation)


} }


  gotohome()
  {
    this.dataservice.setheaderStyle('womens');
    window.scrollTo(0,0);
    this.router.navigate(['gotoproduct'])
  }



  ngOnInit(): void {
  }


  @HostListener('window:scroll', ['$event'])
  doSomething(event) {

  var winScroll = document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  
  // console.log("Scroll %", scrolled);
  document.getElementById("scrollBar").style.width = scrolled + "%";
  }

  aboutusscroll()
  {
    this.showMenu();
  }

  displayordercomp()
  {
    this.router.navigate(['order'],{ relativeTo : this.route})
  }

showMenu(){
    this.toggle=!this.toggle
}
  
  setStyle(value)

  { console.log("next",value)
    this.dataservice.setheaderStyle(value);
   
    this.activelink = value;
     window.scrollTo(0,580);
  }
}

