import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {map} from 'rxjs/Operators'

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
      // .pipe(map(postData=>{
      //     return {data:postData.posts.map(post=>{
      //         return {
      //             id:post._id,
      //             type:post.type,
      //             name:post.name,
      //             image:post.image,
      //             estimatedprice:post.estimatedprice,
      //             price:post.price,
      //             fabric:post.fabric,
      //             clothtype:post.clothtype,
      //             description:post.description,
      //             extrainfo:post.extrainfo,
      //             color:post.color,
        
      //         }
      //     }),maxposts:postData.maxPosts
      // }}))
    //   .subscribe(transformData => {
    //     this.posts = transformData;
    //     this.postUpdated.next([...this.posts]);
    //   });
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
      console.log(post)
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
     
     


      console.log("value here",postData);
  return  this.http
      .post<{ message: string,post:Post }>("http://localhost:3000/api/posts", postData)
    //   .subscribe(() => {
    //     console.log("successfull");
    //     // this.posts.push(post);
    //     // this.postUpdated.next(this.posts);
    //     // this.getPosts()
    //   });
  }

  deletePost(postId:string){
       return this.http.delete("http://localhost:3000/api/posts/"+postId)
    //   .subscribe(()=>{
    //     console.log("hiii")

    //       console.log("deleted")
    //     //   const updatedPost=this.posts.filter(post => post.id !==postId)
    //     //   this.posts=updatedPost
    //     //   this.postUpdated.next([...this.posts])
    //     //   this.getPosts()
    //   })
  }

  updatePost(postId:String,post){
  //     let postData
  //     if(typeof post.image ==='object'){
  //        postData=new FormData()
  //        postData.append('id',post.id)
  //       postData.append('title',post.title)
  //       postData.append('content',post.content)
  //       postData.append('image',post.image, post.title)
  //     }
  //     else{
  //          postData={
  //           id:post.id,
  //           title:post.title,
  //           content:post.content,
  //           imagePath:post.image
        
  //          }
  //     }
  //     return this.http.put("http://localhost:3000/api/posts/"+postId,postData)
  }
}
