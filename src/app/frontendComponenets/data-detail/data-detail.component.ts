import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, from } from 'rxjs';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import   products  from 'src/assets/data.json';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dataservice } from 'src/app/data-service';
import { PostsService } from 'src/app/posts/posts.service';


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
    private postservice: PostsService,
    private modalService: NgbModal,
    private formbuilder: FormBuilder,
    
    ) { }
  orderForm:FormGroup
  d: number;
  type:string;
 
  value = false;
  time: string;
  quantity = [1,2,3,4,5,6]
  data:any
    private subscription: Subscription;

  @ViewChild('content') Elementref;

  detailcont: any
  ngOnInit(): void {     

   
    this.dataservice.getdatadetail().subscribe((value)=>
    {
      this.data = value
      this.modalService.open(this.Elementref,{ size: 'xl',centered: true });
      console.log("subscriber",this.data)

      // this.orderForm=this.formbuilder.group({
      //   'userid': new FormControl("huysdghsfbjh213",[Validators.required]),
      //   // this.detail.name
      //   'prodname': new FormControl(this.data?.name,[Validators.required]),
      //   'Quantity': new FormControl("",[Validators.required]),
      //   'address': new FormControl("",[Validators.required]),
      //   'prodid': new FormControl(this.data?._id,[Validators.required]),
      //   'image': new FormControl(this.data?.image,[Validators.required]),
      //   'contactNumber': new FormControl("",[Validators.required]),
  
      // })

 this.orderForm=this.formbuilder.group({
        'userid': new FormControl("huysdghsfbjh213",[Validators.required]),
        // this.detail.name
        'prodname': new FormControl(this.data?.name,[Validators.required]),
        'Quantity': new FormControl("",[Validators.required]),
        'address': new FormControl("",[Validators.required]),
        'prodid': new FormControl(this.data?._id,[Validators.required]),
        'image': new FormControl(this.data?.image,[Validators.required]),
        'contactNumber': new FormControl("",[Validators.required]),
  
      })
     
    })
    
   
    
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
  
    // this.modalService.open(this.Elementref,{ size: 'xl',centered: true });
   
  }
  overallcontent = true;
  orderbtn = false;

  enableform = false
  order()
  {
    this.enableform = !this.enableform
  
    
  }

  detailclose()
  {
    this.modalService.dismissAll();
    this.closedetail.emit();
    this.dataservice.subject.next(true);
  
  }

  onSaveOrder()
  {
    console.log("orderForm----",this.orderForm.value)

    this.postservice.addOrder(this.orderForm.value).subscribe((result)=>{
      if(result){
        this.router.navigate(["/"])
      }
    })


    this.detailclose()
  }

  orderQuantity(value)
  {
    console.log(">>>>> - ",this.data?.id)
    this.orderForm.controls.prodname.patchValue(this.data?.name);
    this.orderForm.controls.prodid.patchValue("kfdmgdk4353434");
    this.orderForm.controls.image.patchValue(this.data?.image);
    this.orderForm.controls.Quantity.patchValue(value);
  }

  ngOnDestroy()
  {
    // this.subscription.unsubscribe();
  }
  

}
