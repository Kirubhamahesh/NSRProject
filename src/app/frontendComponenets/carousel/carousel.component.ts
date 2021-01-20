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
      
    
    // this.subscription = this.dataservice.headerStyle.subscribe(
    //   (value: string) =>
    //   {
    //     console.log("kirubha pls",value)
    //     if(value)
    //     this.value = false;
    //     else
    //     this.value = true;
    //   }
    // )
  }

  @HostListener('window:scroll', ['$event'])
  doSomething(event) {

  var winScroll = document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  
  // console.log("Scroll %", scrolled);
  document.getElementById("scrollBar").style.width = scrolled + "%";
  }

  

  // @ViewChild('alert', { static: true }) alert: ElementRef;

  // closeAlert() {
  //   this.alert.nativeElement.classList.remove('show');
  // }
  
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.subscription.unsubscribe();
}

alertbtn = true;
alertmethod()
{
  this.alertbtn = false;
}

}
