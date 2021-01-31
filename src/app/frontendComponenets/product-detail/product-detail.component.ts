import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dataservice } from 'src/app/data-service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

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

datadetail = false
detailcont: any
    ngOnInit(): void {
      this.dataservice.datadetail.subscribe(
        ( value: { number: number; name: string; })=>
        {
          this.datadetail = true;
          this.detailcont = value;
          console.log("detail",this.datadetail)
        })  
     }
    
    

    gototop()
    {
      window.scrollTo(0,0);
    }
    closecomp()
    {
      this.datadetail = false;
      console.log("closed");
    }
}
