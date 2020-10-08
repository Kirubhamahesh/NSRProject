import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dataservice } from '../data-service';

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
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  
  ngOnInit(): void {
      
    
    this.subscription = this.dataservice.subject.subscribe(
      (value: boolean) =>
      {
        console.log("carousel value",value);
        if(value)
        this.value = true;
        else
        this.value = false;
      }
    )


  }

  @ViewChild('alert', { static: true }) alert: ElementRef;

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }
  
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.subscription.unsubscribe();
}
}
