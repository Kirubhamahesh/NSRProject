import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {map} from 'rxjs/Operators'
import { Order } from './order.model';
import { User } from '../frontendComponenets/models/User';

 

@Injectable({
  providedIn: "root"
})
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient) {}

  getPosts() {
      
   return this.http
      .get<any>(
        "http://localhost:3000/api/posts"
      )
   
  }

  getUsers() {
      
    return this.http
       .get<any>(
         "http://localhost:3000/api/posts/users"
       )
    
   }


  getOrderdatas() {
      
    return this.http
       .get<any>(
         "http://localhost:3000/api/posts/order"
       )
    
   }


  getPostUpdatedListner() {
    console.log("listener")
    return this.postUpdated.asObservable();
  }

  getPost(postId){
      return this.http.get<any>("http://localhost:3000/api/posts/"+postId).pipe(map(post=>{
            return {
              id:post._id,
              type:post.type,
              name:post.name,
              image:post.image,
              estimatedprice:post.estimatedprice,
              price:post.price,
              fabric:post.fabric,
              clothtype:post.clothtype,
              description:post.description,
              extrainfo:post.extrainfo,
              color:post.color,
            }
        
    }))
  }

  addPost(post) {
      console.log("post image",post.image)
      const postData=new FormData()

      postData.append('type',post.type)
      postData.append('image',post.image)
      postData.append('name',post.name)
      postData.append('price',post.price)
      postData.append('estimatedprice',post.estimatedprice)
      postData.append('clothtype',post.clothtype)
      postData.append('color',post.color)
      postData.append('fabric',post.fabric)
      postData.append('description',post.description)
      postData.append('extrainfo',post.extrainfo)

      let prodData = { 'type':post.type,'image':post.image,'name':post.name,'price':post.price,
      'estimatedprice':post.estimatedprice,'clothtype':post.clothtype,'color':post.color,'fabric':post.fabric,
      'description':post.description,'extrainfo':post.extrainfo}


      console.log("postData----",prodData)
  return  this.http
      .post<{ message: string,post:Post }>("http://localhost:3000/api/posts", postData)

  }


  
  addUser(post) {
    console.log("post",post)
  
   
    let userData = { 'username':post.username,'email':post.email,'password':post.password,'contactnumber':post.contactnumber}

    console.log("postData----",userData)
return  this.http
    .post<{ message: string,post:User }>("http://localhost:3000/api/posts/user", userData).subscribe((resp)=>
    {
      console.log(resp)
    })

}


  addOrder(orderob) {
    console.log("orderob------->>",orderob.address,
    orderob.userid,
    orderob.prodname,
    orderob.contactNumber,
    orderob.Quantity,
    orderob.prodid,
    orderob.image)


    let orderData = { 'userid':orderob.userid,'prodname':orderob.prodname,'address':orderob.address,'Quantity':orderob.Quantity,'prodid':orderob.prodid,
    'image':orderob.image,'contactNumber':orderob.contactNumber
  }


    console.log("orderData -- ",orderData)
  

return  this.http
    .post<{ message: string,orderob:Order }>("http://localhost:3000/api/posts/order", orderData)
 
}


  deletePost(postId:string){
    console.log("inpost",postId)
       return this.http.delete("http://localhost:3000/api/posts/"+postId)
    
  }

  
  deleteProd(postId:string){
    console.log("inpost",postId)
       return this.http.delete("http://localhost:3000/api/posts/prod/"+postId)
    
  }


  updatePost(postId:String,post){


    if(typeof post.image ==='object'){
  const postData=new FormData()

  postData.append('type',post.type)
  postData.append('image',post.image)
  postData.append('name',post.name)
  postData.append('price',post.price)
  postData.append('estimatedprice',post.estimatedprice)
  postData.append('clothtype',post.clothtype)
  postData.append('color',post.color)
  postData.append('fabric',post.fabric)
  postData.append('description',post.description)
  postData.append('extrainfo',post.extrainfo)

  console.log("post ser if")

  return this.http.put("http://localhost:3000/api/posts/"+postId,postData)

    }
    else{

  let prodData = { 'type':post.type,'imagePath':post.image,'name':post.name,'price':post.price,
  'estimatedprice':post.estimatedprice,'clothtype':post.clothtype,'color':post.color,'fabric':post.fabric,
  'description':post.description,'extrainfo':post.extrainfo}

  console.log("post ser else",prodData)
  return this.http.put("http://localhost:3000/api/posts/"+postId,prodData)

    }

  }
}
