import { Component, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dataservice } from 'src/app/data-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataservice: Dataservice) { }
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
  }



  size: { menarea: number; womenarea: number;kidarea: number }

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

showMenu(){
    this.toggle=false
}
  
  setStyle(value)
  { console.log("next",value)
    this.dataservice.setheaderStyle(value);
   
    this.activelink = value;
    window.scrollTo(0,580);
  }
}

