import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private formbuilder: FormBuilder)  { }

  postForm:FormGroup
  
  ngOnInit(): void {

    
  this.postForm=this.formbuilder.group({
    'name': new FormControl("",[Validators.required]),
    'number': new FormControl("",[Validators.required]),
    'password': new FormControl("",[Validators.required]),
    'repassword': new FormControl("",[Validators.required]),
    'email': new FormControl("",[Validators.required])
  })

  }

  createPost()
  {
   console.log( this.postForm.value);
  }



  

}
