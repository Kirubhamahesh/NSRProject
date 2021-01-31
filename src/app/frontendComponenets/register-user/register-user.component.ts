import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Dataservice } from 'src/app/data-service';
import { PostsService } from 'src/app/posts/posts.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,private router: Router,private route: ActivatedRoute,private dataservice: Dataservice,private postservice: PostsService){}


  postForm:FormGroup
  
  gender = ['Male','Female','Other']
  
  ngOnInit(): void {

    
  this.postForm=this.formbuilder.group({
    'username': new FormControl("",[Validators.required]),
    'contactnumber': new FormControl("",[Validators.required]),
    'gender': new FormControl("Male",[Validators.required]),
    'password': new FormControl("",[Validators.required]),
    'repassword': new FormControl("",[Validators.required]),
    'email': new FormControl("",[Validators.required])
  })

  }

  createPost()
  {
   console.log( this.postForm.value);
  }

  selectedgender(value)
  {
    this.postForm.controls.gender.patchValue(value);
  }

  onSubmit()
  {
    this.postservice.addUser(this.postForm.value)
  }

  

}
