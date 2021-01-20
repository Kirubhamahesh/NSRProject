import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dataservice } from 'src/app/data-service';

@Component({
  selector: 'app-orderinstruction',
  templateUrl: './orderinstruction.component.html',
  styleUrls: ['./orderinstruction.component.css']
})
export class OrderinstructionComponent implements OnInit {

  constructor(private dataservice: Dataservice) { }

  subscription: Subscription
  value = true;
  ngOnInit(): void {

    window.scrollTo(0,0);

    this.subscription = this.dataservice.orderenable.subscribe(
      (value: boolean) =>
      {
      
        // if(value)
        // this.value = true;
        // else
        // this.value = false;
      }
    )
    
  }

}
