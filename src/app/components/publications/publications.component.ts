import { AuthService } from './../../services/auth/auth.service';
import { PublicationService } from './../../services/publication/publication.service';
import { PublicationInterface } from './../../interfaces/publication-interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  id:String
  user_id:String
  title:String
  content:String

  publicaciones:PublicationInterface = {
    id:"",
    user_id:"",
    title:"",
    content:""
  }
  arrayPublicaciones:Array<PublicationInterface>
  constructor(private publicationService:PublicationService, private asd:AuthService) { }

  ngOnInit(): void {
    this.publicationService.getAllPosts().subscribe(all=>{
      this.arrayPublicaciones=all;}
      ,error=>{console.error(error)});
  }
  addNewPost(){
    const newPublicacion = {
      user_id: this.user_id,
      title: this.title,
      content: this.content
    };
    this.asd.addNewtPost(newPublicacion).subscribe((nuevo)=>{console.log(nuevo)})
  }
  upTitlePost(){
    const upTitle = {
      id:this.id,
      user_id:this.user_id,
      title:this.title,
      content:this.content
    };
    this.asd.upTitlePost(upTitle).subscribe(nuevo=>{console.log(nuevo)})
  }
  upContentPost(){
    const upContent = {
      id:this.id,
      user_id:this.user_id,
      title:this.title,
      content:this.content
    };
    this.asd.upContentPost(upContent).subscribe(nuevo=>{console.log(nuevo)})
  }
  deletePost(){
    const deleteContent = {
      id:this.id,
      user_id:this.user_id,
      title:this.title,
      content:this.content
    };
    this.asd.deletePost(deleteContent).subscribe((borrado)=>{console.log(borrado)})
  }
}
