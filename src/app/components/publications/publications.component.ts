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
  buscador:boolean
  alll:boolean
  id: any
  user_id: any
  title: String
  content: String

  publicaciones: PublicationInterface = {
    id: "",
    user_id: "",
    title: "",
    content: ""
  }
  arrayByID: Array<PublicationInterface>
  arrayByTitle: Array<PublicationInterface>
  arrayPublicaciones: Array<PublicationInterface>
  constructor(private publicationService: PublicationService) { }
  ngOnInit(): void {
    this.publicationService.getAllPosts().subscribe(all => {
      this.arrayPublicaciones = all;
    }, error => { console.error(error) });

    this.publicationService.getUserID().subscribe(idGet => {
      this.user_id = idGet
    })
  }
  getPostID(): void {
    const byID = {
      id: this.id,
      user_id: this.user_id,
      title: this.title,
      content: this.content
    };
    this.publicationService.getPostID(byID).subscribe(id => { this.arrayByID = id }, title => { console.log(title) })
  }
  getPostTitle(): void {
    const byTitle = {
      id: this.id,
      user_id: this.user_id,
      title: this.title,
      content: this.content
    };
    this.buscador = true
    this.alll=false
    this.publicationService.getPostTitle(byTitle).subscribe(title => { this.arrayByTitle = title }, title => { console.log(title) })
  }
  addNewPost(): void {
    const newPublicacion = {
      user_id: this.user_id,
      title: this.title,
      content: this.content
    };
    this.publicationService.addNewtPost(newPublicacion).subscribe((nuevo) => { console.log(nuevo) })
  }
  upTitlePost(): void {
    const upTitle = {
      id: this.id,
      user_id: this.user_id,
      title: this.title,
      content: this.content
    };
    this.publicationService.upTitlePost(upTitle).subscribe(nuevo => { console.log(nuevo) })
  }
  upContentPost(): void {
    const upContent = {
      id: this.id,
      user_id: this.user_id,
      title: this.title,
      content: this.content
    };
    this.publicationService.upContentPost(upContent).subscribe(nuevo => { console.log(nuevo) })
  }
  deletePost(): void {
    const deleteContent = {
      id: this.id,
      user_id: this.user_id,
      title: this.title,
      content: this.content
    };
    this.publicationService.deletePost(deleteContent).subscribe((borrado) => { console.log(borrado) })
  }
}
