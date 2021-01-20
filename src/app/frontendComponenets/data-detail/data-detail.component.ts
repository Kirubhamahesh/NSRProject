import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, from } from 'rxjs';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import   products  from 'src/assets/data.json';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dataservice } from 'src/app/data-service';


@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.css']
})
export class DataDetailComponent implements OnInit, OnDestroy {
  products: any = [];
  @Output() closedetail = new EventEmitter();
  constructor(private httpClient: HttpClient,private router: Router,private route: ActivatedRoute,
    private dataservice: Dataservice,
    private modalService: NgbModal,
    private formbuilder: FormBuilder,
    
    ) {
       this.products = products;
     }


    

  postForm:FormGroup
  



  id: number;
  type:string;
 
  value = false;
  time: string;
  data: {id:number,type:string,name:string,image: string,price: string,estimatedprice: string,description: string,clothtype:string,color:string};
  private subscription: Subscription;

  @ViewChild('content') Elementref;

  @Input() detail;
  
  topofmenarea = 0;
  topofwomenarea = 0;
  topofkidarea = 0;
  ngOnInit(): void {      

    this.postForm=this.formbuilder.group({
      'name': new FormControl("",[Validators.required]),
      'number': new FormControl("",[Validators.required]),
      'password': new FormControl("",[Validators.required]),
      'repassword': new FormControl("",[Validators.required]),
      'email': new FormControl("",[Validators.required])
    })
    

    this.dataservice.heightofdiv.subscribe(
      ( size: { menarea: number; womenarea: number;kidarea: number }) =>
      {
       
        this.topofkidarea = size.kidarea;
        this.topofmenarea = size.menarea;
        this.topofwomenarea = size.womenarea;
       
      }
    )

   window.scrollTo(0,0);

        
          this.id = this.detail.number.valueOf();
          console.log(typeof this.id);
          this.type =this.detail.name.toString();
          console.log(typeof this.type);
          this.value = true;
          
          if(this.type === "women")
          this.data = this.products.dataobj.womens[this.id];
          if(this.type === "men")
          this.data = this.products.dataobj.mens[this.id];
          if(this.type === "kids")
          this.data = this.products?.dataobj?.kids[this.id];
        
    
  
      this.subscription = this.dataservice.detailenable.subscribe(
        (value: boolean) =>
        {
         
          if(value)
          this.value = true;
          else
          this.value = false;
        }
      )

    var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

var x = setInterval(function() {
var now = new Date().getTime();
    
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  document.getElementById("timer").innerHTML = hours + "h "  + minutes + "m " + seconds + "s ";
   this.time =  hours + "h "  + minutes + "m " + seconds + "s ";
  
  if (distance < 0) {
    clearInterval(x);
    this.time = "EXPIRED";
  }
}, 1000);

  }

  ngAfterViewInit(): void {
    // this.modalService.open(this.Elementref);
    this.modalService.open(this.Elementref,{ size: 'xl',centered: true });
   
  }
  overallcontent = true;
  orderbtn = false;

  enableform = false
  order()
  {
    this.enableform = !this.enableform
    // this.orderbtn = !this.orderbtn;
    // this.overallcontent = !this.orderbtn
    
  }

  detailclose()
  {
    this.modalService.dismissAll();
    this.closedetail.emit();
    this.dataservice.subject.next(true);
  
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
  

}
