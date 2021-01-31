import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dataservice } from 'src/app/data-service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class MainComponent  {

  animation = false;
  value = false;
  constructor(private dataservice: Dataservice,private config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
if(document.documentElement.scrollTop >=750) {
  this.value = true;
   }
else
{
  this.value = false;
}
}


    gototop()
    {
      window.scrollTo(0,0);
    }
   
    
  }
  