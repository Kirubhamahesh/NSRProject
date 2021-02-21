import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dataservice } from 'src/app/data-service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  private subscription: Subscription;
  constructor(private route: ActivatedRoute,private dataservice: Dataservice) {

   }
   value=true;
  
  
  ngOnInit(): void {
      
  }

  @HostListener('window:scroll', ['$event'])
  doSomething(event) {

  var winScroll = document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
 
  document.getElementById("scrollBar").style.width = scrolled + "%";
  }

  
ngOnDestroy(): void {

}

alertbtn = true;
alertmethod()
{
  this.alertbtn = false;
}

}
