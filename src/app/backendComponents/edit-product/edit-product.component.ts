
import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostsService } from 'src/app/posts/posts.service';
import { Dataservice } from 'src/app/data-service';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/posts/post.model';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

 
 
  id: number
  type: string
  detailedobj: any
  postForm: FormGroup;
  products: any = []
  data: any


  enteredtitle=''
  enteredcontent=''
  mode='create'
  isLoading=false
  postId
  imagePreview:string
  post:Post
  @Output() postCreated =new EventEmitter<Post>();


    constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private dataservice: Dataservice,
      private httpClient: HttpClient,
      private postservice: PostsService,
      )  { }
  ngOnInit(): void {

    //  this.httpClient.get("assets/data.json").subscribe(data =>{
    //   this.products = data;
    // })

    this.products = this.dataservice.getProducts()

     this.route.params.subscribe((params: Params)=>
    {
     this.id = +params['id'];
     this.type = params['type']
     console.log(this.id,this.type,this.products)
     

      if(this.type === "women")
      this.data = this.products.dataobj.womens[this.id];
      if(this.type === "men")
      this.data = this.products.dataobj.mens[this.id];
      if(this.type === "kids")
      this.data = this.products?.dataobj?.kids[this.id];
      console.log(this.data)

    })

      this.postForm = this.formBuilder.group({
      // id: ["", Validators.required],
      name: ["", Validators.required],
      type: ["", Validators.required],
      image: ["", Validators.required],
      estimatedprice: ["", Validators.required],
      price: ["", Validators.required],
      description: ["", Validators.required],
      fabric: ["", Validators.required],
      extrainfo: ["", Validators.required],
      color: ["", Validators.required],
      clothtype: ["", Validators.required],
    });
    console.log("patch val",this.data)
      this.imagePreview= this.data?.image
    this.postForm.patchValue(this.data)



    // this.route.paramMap.subscribe(paramMap=>{
    //   this.isLoading=true
    //   if(paramMap.has('postId')){
    //     this.mode='edit'
    //      this.postId=paramMap.get('postId')
    //     this.postservice.getPost(this.postId).subscribe(post=>{
    //       this.isLoading=false
    //       this.post=post
    //       this.postForm.patchValue(this.post)
    //       this.postForm.patchValue({image:this.post.image})
    //       this.imagePreview=post.image
    //     });
    //   }else{
    //     this.mode='create'
    //     this.isLoading=false
    //   }
    // })
   }

  

  


  onSavePost(){
    console.log(this.postForm.value,"onsave")
      this.postservice.addPost(this.postForm.value).subscribe((result)=>{
       
        if(result){
          this.router.navigate(["/"])
        }
      })

      // this.postservice.updatePost(this.postId,this.postForm.value).subscribe((result)=>{
      //   if(result){
      //     this.router.navigate(["/"])
        
      // })
      this.postForm.reset();
    }
   
    onImagePicked(event:Event){
     const file=(event.target as HTMLInputElement).files[0];
     this.postForm.patchValue({image:file});
     this.postForm.get('image').updateValueAndValidity();
     const reader=new FileReader()
     reader.onload=()=>{
       this.imagePreview=reader.result as string
     }
     reader.readAsDataURL(file)
   }
    
   

    }
   
  


