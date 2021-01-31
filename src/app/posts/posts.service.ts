import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {map} from 'rxjs/Operators'
import { Order } from './order.model';

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
      console.log("post",post)
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

      console.log("postData----",postData)
  return  this.http
      .post<{ message: string,post:Post }>("http://localhost:3000/api/posts", postData)

  }

  addOrder(orderob) {
    console.log("orderob------->>",orderob.address,orderob.userid,orderob.prodname,orderob.contactNumber,orderob.Quantity,orderob.prodid,orderob.image)

    // const orderData=new FormData()

    // orderData.append('userid',orderob.userid)
    // orderData.append('prodname',orderob.prodname)
    // orderData.append('Quantity',orderob.Quantity)
    // orderData.append('prodid',orderob.prodid)
    // orderData.append('image',orderob.image)
    // orderData.append('contactNumber',orderob.contactNumber)

    let orderData = { 'userid':orderob.userid,'prodname':orderob.prodname,'address':orderob.address,'Quantity':orderob.Quantity,'prodid':orderob.prodid,
    'image':orderob.image,'contactNumber':orderob.contactNumber
  }


    console.log("orderData -- ",orderData)
  

return  this.http
    .post<{ message: string,orderob:Order }>("http://localhost:3000/api/posts/order", orderData)
 
}


  deletePost(postId:string){
    console.log("inpost")
       return this.http.delete("http://localhost:3000/api/posts/"+postId)
    
  }

  updatePost(postId:String,post){

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

  return this.http.put("http://localhost:3000/api/posts/"+postId,postData)

  }
}
